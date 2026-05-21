import { product_type } from "@/components/interface";

export const products: product_type[] = [
  {
    id: 1,
    title: "AIイラスト素材セット",
    description: "Midjourneyで生成した高品質なイラスト素材です。商用利用可能。",
    creator_name: "田中 太郎",
    download_url: "/api/products/1/download",
  },
  {
    id: 2,
    title: "Midjourneyプロンプトテンプレート集",
    description: "すぐに使えるMidjourneyプロンプト50選。ジャンル別に整理済み。",
    creator_name: "鈴木 花子",
    download_url: "/api/products/2/download",
  },
];