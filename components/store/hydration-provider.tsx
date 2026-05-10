'use client';

import { useEffect } from 'react';
import { useStore } from '@/components/store/use-store';

const STORE_KEY = 'linunaura-store';

export function StoreHydration({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        useStore.getState().setHydrated(parsed?.state || {});
      } else {
        useStore.getState().setHydrated({} as any);
      }
    } catch {
      useStore.getState().setHydrated({} as any);
    }

    const unsub = useStore.subscribe((state) => {
      try {
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ state: { cart: state.cart, wishlist: state.wishlist } })
        );
      } catch {}
    });

    return unsub;
  }, []);

  return <>{children}</>;
}
