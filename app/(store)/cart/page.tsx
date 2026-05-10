'use client';

import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/components/store/use-store';
import { formatINR } from '@/lib/utils';

export default function CartPage() {
  const cart = useStore((s) => s.cart || []);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateCartQuantity = useStore((s) => s.updateCartQuantity);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const clearCart = useStore((s) => s.clearCart);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 5000 ? 0 : 149;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground/30" />
        <h1 className="mt-8 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Discover our premium bedsheets and add items to your cart
        </p>
        <Link href="/products" className="mt-8 inline-block">
          <Button className="group gap-2 rounded-full px-10 py-6 text-sm font-medium uppercase tracking-wider">
            Continue Shopping <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-6 py-8">
                <Link href={`/products/${item.product.slug}`} className="shrink-0">
                  <div className="h-28 w-28 overflow-hidden rounded-xl">
                    <img
                      src={item.product.images[0] || 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/products/${item.product.slug}`} className="font-medium transition-colors hover:text-foreground/80">
                        {item.product.name}
                      </Link>
                      {item.product.material && (
                        <p className="mt-1 text-xs text-muted-foreground">{item.product.material}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <span className="font-display text-lg font-bold">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-8">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <div className="mt-8 space-y-4 text-sm">
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
            <div className="border-t pt-4">
              <div className="flex justify-between font-display text-xl font-bold">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
          </div>
          {subtotal < 5000 && (
            <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
              Add {formatINR(5000 - subtotal)} more for free shipping
            </p>
          )}
          <Link href="/checkout" className="mt-8 block">
            <Button size="lg" className="w-full gap-2 rounded-full py-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:shadow-xl">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/products" className="mt-3 block">
            <Button variant="outline" size="lg" className="w-full rounded-full py-6 text-sm font-medium uppercase tracking-wider">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
