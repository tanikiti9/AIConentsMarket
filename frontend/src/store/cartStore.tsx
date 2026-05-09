import { create } from 'zustand';
import { product_type } from '@/components/interface';

type CartStore = {
  cartItems: product_type[];
  addItem: (product: product_type) => void;
  removeItem: (id: number) => void;
};



export const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    addItem: (product) => set ((state) => {
      const alreadyExists = state.cartItems.some((p) => p.id === product.id);
      if (alreadyExists) return state;
      return {cartItems: [...state.cartItems, product]};
    }),
    removeItem: (id) => set((state) => ({cartItems: state.cartItems.filter((p) => p.id !== id)})) //idが一致しないものを残す
}));