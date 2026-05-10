import Link from 'next/link';
import type { Category } from '@/types';

interface CategoriesProps {
  categories: Category[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Explore</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Collection
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discover our curated bedsheets for every style and size
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`animate-slide-up stagger-${i + 1} group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image_url || 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-xl font-bold text-white transition-transform duration-500 group-hover:translate-y-0">{category.name}</h3>
                <p className="mt-2 text-sm text-white/80 line-clamp-2 transition-all duration-500 group-hover:text-white/90">{category.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-white/70 transition-all duration-300 group-hover:text-white">
                  Explore
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
