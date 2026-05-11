<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'title'        => 'AIイラスト素材セット',
                'creator_name' => '田中 太郎',
                'description'  => 'Midjourneyで生成した高品質なイラスト素材です。商用利用可能。',
                'file_name'    => 'ai_illustration_set.txt',
                'content'     => "AI Illustration Set\n===================\nThis is a sample AI illustration set.\nGenerated with Midjourney v6.\n\n[File 1] landscape_01.png (placeholder)\n[File 2] landscape_02.png (placeholder)\n[File 3] portrait_01.png (placeholder)\n",
            ],
            [
                'title'        => 'Midjourneyプロンプトテンプレート集',
                'creator_name' => '鈴木 花子',
                'description'  => 'すぐに使えるMidjourneyプロンプト50選。ジャンル別に整理済み。',
                'file_name'    => 'midjourney_prompts.txt',
                'content'     => "Midjourney Prompt Templates\n===========================\n\n[Landscape]\n1. \"serene mountain lake at sunset, golden hour, photorealistic --ar 16:9 --v 6\"\n2. \"misty forest path, morning light, cinematic --ar 16:9 --v 6\"\n\n[Portrait]\n3. \"elegant woman in traditional Japanese kimono, studio lighting --ar 2:3 --v 6\"\n4. \"young man with cyberpunk aesthetic, neon lights --ar 2:3 --v 6\"\n\n[Architecture]\n5. \"futuristic city skyline at night, ultra-detailed --ar 16:9 --v 6\"\n",
            ],
        ];

        foreach ($products as $data) {
            $path = "products/{$data['file_name']}";
            Storage::disk('local')->put($path, $data['content']);

            Product::firstOrCreate(
                ['title' => $data['title']],
                [
                    'creator_name' => $data['creator_name'],
                    'description'  => $data['description'],
                    'file_path'   => $path,
                    'file_name'   => $data['file_name'],
                    'file_size'   => strlen($data['content']),
                    'status'      => 'published',
                ]
            );
        }
    }
}
