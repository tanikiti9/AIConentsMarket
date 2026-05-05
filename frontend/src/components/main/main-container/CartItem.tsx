'use client';
import { product_type } from '@/components/interface';
import { useCartStore } from '@/store/cartStore';

type Props = {
  product: product_type;
};

export default function CartItem({ product }: Props) {
  const removeItem = useCartStore((state) => state.removeItem);
  const createLink = () => {
    const link = document.createElement('a');
    link.href = product.downloadLink;
    link.download = product.title;
    link.click();
  }//aタグ生成

   return (
    <div className='Container_Card'>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <button onClick={() => removeItem(product.id)}>
        削除
      </button>
      <button onClick={() => createLink()}>ダウンロード</button>
    </div>
  );
}