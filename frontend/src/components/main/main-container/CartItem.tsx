'use client';
import { product_type } from '@/components/interface';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/getToken';
import { cache } from 'react';

type Props = {
  product: product_type;
};

export default function CartItem({ product }: Props) {
  const removeItem = useCartStore((state) => state.removeItem);
  const token = useAuthStore((state) => state.token);

  const handleDownload = async () => {
    console.log('token:', token);
    if (!token) {
      alert('ダウンロードするにはログインしてください');
      return;
    }
    try {
      const purchaseRes = await fetch('api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id }),
      })

      if (!purchaseRes.ok && purchaseRes.status !== 409) {
        throw new Error('購入に失敗しました')
      }

      const downloadRes = await fetch(`/api/products/${product.id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!downloadRes.ok) {
        alert('ログインしてください')
        return
      };

      const blob = await downloadRes.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = product.title;
      link.click();
      URL.revokeObjectURL(url);
    }
    catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <div className='Container_Card'>
      <h3>{product.title}</h3>
      <p>{product.creator_name}</p>
      <p>{product.description}</p>
      <button onClick={() => removeItem(product.id)}>削除</button>
      <button onClick={handleDownload}>ダウンロード</button>
    </div>
  );
}