'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import type { Product, Category } from '@/types';
import { useState } from 'react';

interface ProductListingProps {
  products: Product[];
  categories: Category[];
}

export function ProductListing({ products, categories }: ProductListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const activeCategory = categories.find((c) => c.slug === currentCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-slide-up mb-8">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Collection</span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {activeCategory ? activeCategory.name : 'All Bedsheets'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} bedsheet{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="animate-fade-in mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Input
              placeholder="Search bedsheets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateParams('search', search);
              }}
              className="rounded-full pr-10"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
                onClick={() => {
                  setSearch('');
                  updateParams('search', '');
                }}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <Select value={currentCategory} onValueChange={(v) => updateParams('category', v)}>
            <SelectTrigger className="w-[160px] rounded-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={currentSort} onValueChange={(v) => updateParams('sort', v)}>
          <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentCategory && (
        <div className="mb-6">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5 rounded-full"
            onClick={() => updateParams('category', '')}
          >
            Clear filter <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">No bedsheets found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} className={`animate-slide-up stagger-${(i % 4) + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
