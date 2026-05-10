'use client';

import { create } from 'zustand';
import type { Product } from '@/types';

interface CartItemLocal {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItemLocal[];
  wishlist: string[];
  _hydrated: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
  setHydrated: (state: Partial<StoreState>) => void;
}

const useStore = create<StoreState>()((set, get) => ({
  cart: [],
  wishlist: [],
  _hydrated: false,

  addToCart: (product: Product, quantity = 1) => {
    const cart = get().cart || [];
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { product, quantity }] });
    }
  },

  removeFromCart: (productId: string) => {
    set({ cart: (get().cart || []).filter((item) => item.product.id !== productId) });
  },

  updateCartQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: (get().cart || []).map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId: string) => {
    const wishlist = get().wishlist || [];
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },

  isInWishlist: (productId: string) => {
    return (get().wishlist || []).includes(productId);
  },

  getCartTotal: () => {
    return (get().cart || []).reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getCartCount: () => {
    return (get().cart || []).reduce((count, item) => count + item.quantity, 0);
  },

  setHydrated: (state: Partial<StoreState>) => {
    set({
      cart: state.cart || [],
      wishlist: state.wishlist || [],
      _hydrated: true,
    });
  },
}));

export { useStore }