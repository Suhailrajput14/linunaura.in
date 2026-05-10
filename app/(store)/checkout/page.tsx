'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/components/store/use-store';
import { ArrowRight, Lock } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((s) => s.cart || []);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const clearCart = useStore((s) => s.clearCart);
  const _hydrated = useStore((s) => s._hydrated);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'IN',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal >= 5000 ? 0 : 149;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (_hydrated && cart.length === 0) {
      router.replace('/cart');
    }
  }, [_hydrated, cart.length, router]);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/order-success');
  };

  if (!_hydrated || cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" required value={form.full_name} onChange={(e) => updateForm('full_name', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => updateForm('email', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={form.address} onChange={(e) => updateForm('address', e.target.value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required value={form.city} onChange={(e) => updateForm('city', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required value={form.state} onChange={(e) => updateForm('state', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">PIN Code</Label>
                    <Input id="zip" required value={form.zip} onChange={(e) => updateForm('zip', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  <Lock className="mx-auto mb-2 h-5 w-5" />
                  Secure payment processing (demo mode)
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 py-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.product.images[0] || 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=100'}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="line-clamp-1 font-medium">{item.product.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">{formatINR(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">{formatINR(tax)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-display text-xl font-bold">
                      <span>Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 rounded-full py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl" disabled={loading}>
                  {loading ? 'Processing...' : <>Place Order <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
