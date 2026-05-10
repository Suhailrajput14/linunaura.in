import { CircleCheck as CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About - Linunaura',
  description: 'Learn about our mission to bring premium bedsheets to every bedroom.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Our Story</span>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Crafting Comfort
              <br />
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">Since 2018</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Founded with a passion for quality and a belief that every bedroom deserves
              the finest bedsheets, Linunaura brings together craftsmanship, sustainability,
              and timeless design from the heart of India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Craftsmanship</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                Crafted with Care
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every Linunaura bedsheet begins with the finest raw materials sourced from
                trusted suppliers across India and the world. From the cotton fields of Gujarat
                to the linen workshops of Belgium, we travel to find the best.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our artisans combine centuries-old techniques with modern innovation,
                creating bedsheets that are both luxurious and durable. Each piece undergoes
                our rigorous 50-point quality inspection before reaching your bedroom.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Craftsmanship"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Principles</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Our Values</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Premium Quality',
                description: 'We never compromise on materials or craftsmanship. Every thread, every stitch in your bedsheet matters.',
              },
              {
                title: 'Sustainable Practices',
                description: 'From organic cotton to eco-friendly packaging, we are committed to protecting our planet.',
              },
              {
                title: 'Timeless Design',
                description: 'Our bedsheet designs transcend trends, creating pieces that you will love for years to come.',
              },
              {
                title: 'Fair Trade',
                description: 'We ensure fair wages and safe working conditions for every artisan in our supply chain.',
              },
              {
                title: 'Customer First',
                description: 'Your satisfaction is our priority. We offer free returns and dedicated concierge support.',
              },
              {
                title: 'Innovation',
                description: 'We continuously invest in research to bring you the latest in bedsheet technology and comfort.',
              },
            ].map((value) => (
              <div key={value.title} className="group rounded-2xl border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/10">
                <CheckCircle className="h-6 w-6 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 font-display text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
