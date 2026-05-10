import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Interior Designer',
    text: 'The Egyptian cotton bedsheets are absolutely divine. My clients always ask where I source my linens, and Linunaura is my secret. The quality is simply unmatched.',
    rating: 5,
  },
  {
    name: 'Rajesh Mehta',
    role: 'Hotel Owner',
    text: 'We switched our entire hotel to Linunaura bedsheets. The quality is unmatched, and our guests consistently rate their sleep experience higher. Worth every rupee.',
    rating: 5,
  },
  {
    name: 'Ananya Iyer',
    role: 'Homeowner',
    text: 'I have never felt anything as soft as these bedsheets. The attention to detail in the stitching and the luxurious feel is extraordinary. My bedroom feels like a five-star suite.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Testimonials</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Trusted by thousands of discerning homeowners who demand the finest bedsheets
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`animate-slide-up stagger-${i + 1} group rounded-2xl border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/10`}
            >
              <Quote className="h-10 w-10 text-muted-foreground/20 transition-colors duration-300 group-hover:text-foreground/20" />
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                {t.text}
              </p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-display text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
