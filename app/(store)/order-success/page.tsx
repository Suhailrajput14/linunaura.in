import Link from 'next/link';
import { CircleCheck as CheckCircle, ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="animate-scale-in mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="animate-slide-up mt-8 font-display text-3xl font-bold">Order Confirmed!</h1>
      <p className="animate-slide-up stagger-2 mt-4 text-muted-foreground leading-relaxed">
        Thank you for your purchase. Your order has been placed successfully.
        You will receive a confirmation email with your order details shortly.
      </p>
      <div className="animate-fade-in stagger-3 mt-10 rounded-2xl border bg-card p-8 text-left">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Order #LN-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            <p className="text-xs text-muted-foreground">Estimated delivery: 5-7 business days</p>
          </div>
        </div>
      </div>
      <div className="animate-fade-in stagger-4 mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products">
          <Button className="group gap-2 rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl">
            Continue Shopping <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
