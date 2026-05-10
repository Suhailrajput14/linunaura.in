'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/components/store/use-store';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isInWishlist = useStore((s) => s.isInWishlist);
  const wishlisted = isInWishlist(product.id);
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=600'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {hasDiscount && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
            -{discountPercent}%
          </span>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-lg backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
            toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${wishlisted ? 'fill-destructive text-destructive scale-110' : ''}`} />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/products/${product.slug}`} className="line-clamp-1 text-sm font-medium transition-colors duration-300 hover:text-foreground/80">
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.review_count})
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold">{formatINR(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.compare_price!)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="gap-1.5 rounded-full transition-all duration-300 hover:bg-foreground hover:text-background"
            disabled={!product.in_stock}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast.success('Added to cart');
            }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
