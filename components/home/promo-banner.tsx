import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-scale-in relative overflow-hidden rounded-3xl bg-foreground px-8 py-20 text-background sm:px-16">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-background/5" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-background/5" />
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="inline-block rounded-full border border-background/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em]">
              Limited Time
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl">
              Summer Sale
              <br />
              <span className="bg-gradient-to-r from-background to-background/60 bg-clip-text text-transparent">Up to 30% Off</span>
            </h2>
            <p className="mt-4 text-background/70 leading-relaxed">
              Refresh your bedroom for the season with our exclusive summer collection.
              Premium cottons, breathable linens, and silky satins at exceptional prices.
            </p>
            <Link href="/products" className="mt-8 inline-block">
              <Button
                variant="secondary"
                size="lg"
                className="group gap-2 rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl"
              >
                Shop the Sale <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
