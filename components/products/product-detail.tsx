'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Truck, Shield, RefreshCcw, Minus, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/components/store/use-store';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isInWishlist = useStore((s) => s.isInWishlist);
  const wishlisted = isInWishlist(product.id);
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="animate-fade-in mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="transition-colors hover:text-foreground">Bedsheets</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {product.category && (
          <>
            <Link href={`/products?category=${product.category.slug}`} className="transition-colors hover:text-foreground">
              {product.category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-16 lg:grid-cols-2">
        <div className="animate-slide-up space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img
              src={product.images[selectedImage] || 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square w-20 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    i === selectedImage ? 'border-foreground shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="animate-slide-in-right space-y-6">
          <div>
            {product.category && (
              <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1 text-xs uppercase tracking-wider">{product.category.name}</Badge>
            )}
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 transition-colors ${
                      i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">{formatINR(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatINR(product.compare_price!)}</span>
                <Badge variant="destructive" className="rounded-full px-3">-{discountPercent}%</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="space-y-4 border-t pt-6">
            {product.material && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Material</span>
                <span className="font-medium">{product.material}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="font-medium">{product.dimensions}</span>
              </div>
            )}
            {product.care_instructions && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Care</span>
                <span className="font-medium">{product.care_instructions}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Availability</span>
              <span className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-destructive'}`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t pt-6">
            <div className="flex items-center rounded-full border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="flex h-10 w-14 items-center justify-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 gap-2 rounded-full py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl"
              disabled={!product.in_stock}
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-4 transition-all duration-300"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
            >
              <Heart className={`h-4 w-4 transition-all duration-300 ${wishlisted ? 'fill-destructive text-destructive scale-110' : ''}`} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t pt-6">
            <div className="group flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Free Shipping</span>
            </div>
            <div className="group flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Quality Guarantee</span>
            </div>
            <div className="group flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                <RefreshCcw className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
