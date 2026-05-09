'use client';
import { product_type } from '@/components/interface';
import { useCartStore } from '@/store/cartStore';

type Props = {
  product: product_type;
};

export default function Card({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '12px' }}>
      <h2>{product.title}</h2>
      <p>{product.creator_name}</p>
      <p>{product.description}</p>
      <button onClick={() => addItem(product)}>
        カートに追加
      </button>
    </div>
  );
}