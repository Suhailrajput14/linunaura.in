import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 luxury-gradient" />
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="space-y-8">
            <span className="animate-fade-in inline-block rounded-full border bg-background/80 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
              New Collection 2025
            </span>
            <h1 className="animate-slide-up font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Where Comfort
              <br />
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Meets Elegance
              </span>
            </h1>
            <p className="animate-slide-up stagger-2 max-w-lg text-base text-muted-foreground leading-relaxed">
              Premium bedsheets crafted from the finest Egyptian cotton,
              Belgian linen, and natural materials. Transform your bedroom into a sanctuary of comfort.
            </p>
            <div className="animate-slide-up stagger-3 flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="group gap-2 rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                  Shop Now <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-foreground hover:text-background">
                  Our Story
                </Button>
              </Link>
            </div>
            <div className="animate-fade-in stagger-4 flex gap-12 pt-6">
              <div>
                <p className="font-display text-3xl font-bold">500+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Premium Bedsheets</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold">50K+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold">4.8</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="animate-scale-in relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Luxury bedroom with premium bedsheets"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="animate-float absolute -bottom-4 -left-4 rounded-2xl bg-background/95 p-6 shadow-xl backdrop-blur-sm border">
              <p className="font-display text-xl font-bold">{formatINR(4999)}</p>
              <p className="text-xs text-muted-foreground">Egyptian Cotton Set</p>
            </div>
            <div className="animate-float stagger-3 absolute -right-4 top-8 rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur-sm border">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm text-yellow-500">&#9733;</span>
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">4.8 Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
