import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { ProductCard } from '@/components/products/product-card';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="animate-slide-up">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Curated Selection</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Bedsheets
            </h2>
            <p className="mt-3 text-muted-foreground">
              Handpicked selections from our premium bedsheet collection
            </p>
          </div>
          <Link href="/products" className="animate-fade-in">
            <Button variant="ghost" className="group gap-2 text-sm uppercase tracking-wider">
              View All <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} className={`animate-slide-up stagger-${i + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
