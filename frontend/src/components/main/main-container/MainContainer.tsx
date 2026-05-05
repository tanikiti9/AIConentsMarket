'use client'
import Card from './Card';;
import { products } from '@/data/products';

export default function MainContainer() {
  return (
    <main>
      <h1>商品一覧</h1>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </main>
  );
}