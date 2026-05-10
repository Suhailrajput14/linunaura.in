'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/components/store/use-store';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist || []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const allProducts = await getProducts({});
      setProducts(allProducts.filter((p) => wishlist.includes(p.id)));
      setLoading(false);
    }
    loadProducts();
  }, [wishlist]);

  if (!loading && wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-6 font-display text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Save bedsheets you love for later
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button className="gap-2 rounded-full px-8">
            Explore Bedsheets <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Wishlist</h1>
      <p className="mt-2 text-muted-foreground">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
