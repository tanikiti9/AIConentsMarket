'use client'
import { useState, useEffect } from 'react';
import Card from './Card';
import { product_type } from '@/components/interface';
import { useSearchStore } from '@/store/searchStore';

export default function MainContainer() {
  const [products, setProducts] = useState<product_type[]>([]);
  const [loading, setLoading] = useState(true);
  const { text, selectedTags } = useSearchStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/sidebar/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            selected_tags: selectedTags,
          }),
        });
        console.log(text, selectedTags)
        if (!res.ok) throw new Error('取得に失敗しました');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [text, selectedTags]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>商品一覧</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
      }}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}