import { product_type } from "@/components/interface";



export const products: product_type[] = [
  {
    id: 1,
    title: 'テスト商品A',
    description: 'これはテスト商品Aの説明文です。',
    creator_name: 'aaa',
    download_url: "http://127.0.0.1:8000/api/products/2/download"
  },
  {
    id: 2,
    title: 'テスト商品B',
    description: 'これはテスト商品Bの説明文です。',
    creator_name: 'bbb',
    download_url: "http://127.0.0.1:8000/api/products/2/download"
  },
];