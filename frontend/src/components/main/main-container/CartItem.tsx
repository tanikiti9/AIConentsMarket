'use client';
import { product_type } from '@/components/interface';
import { useCartStore } from '@/store/cartStore';

type Props = {
  product: product_type;
};



export default function CartItem({ product }: Props) {
  const removeItem = useCartStore((state) => state.removeItem);
  const createLink = () => {
    const fetchUserData = async (url: string): Promise<product_type> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: product_type = await response.json();
      return data;
    };

    const url = 'https://example.com/api/user';
    fetchUserData(url)
      .then(user => console.log('User:', user))
      .catch(error => console.error('Error:', error));
    const link = document.createElement('a');
    link.href = product.download_url;
    link.download = product.download_url;
    link.click();
  }//aタグ生成

  return (
    <div className='Container_Card'>
      <h3>{product.title}</h3>
      <p>{product.creator_name}</p>
      <p>{product.description}</p>
      <button onClick={() => removeItem(product.id)}>
        削除
      </button>
      <button onClick={() => createLink()}>ダウンロード</button>
    </div>
  );
}