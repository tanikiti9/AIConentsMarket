'use client';
import CartItem from '@/components/main/main-container/CartItem';
import { useCartStore } from '@/store/cartStore';


export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <main>
      <h1>カート</h1>
      {cartItems.length === 0 ? (
        <p>カートに商品がありません。</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))
      )}
    </main>
  );
}
