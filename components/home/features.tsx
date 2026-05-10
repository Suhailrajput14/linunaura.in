import { Truck, Shield, RefreshCcw, Headphones } from 'lucide-react';
import { formatINR } from '@/lib/utils';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: `Complimentary delivery on all orders over ${formatINR(5000)}`,
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Every bedsheet passes our 50-point quality check',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy on all items',
  },
  {
    icon: Headphones,
    title: 'Concierge Support',
    description: 'Dedicated support team for personalized assistance',
  },
];

export function Features() {
  return (
    <section className="border-y py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={feature.title} className={`animate-fade-in stagger-${i + 1} group flex items-start gap-5 transition-all duration-300`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-muted transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                <feature.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
