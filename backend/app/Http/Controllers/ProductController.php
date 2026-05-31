<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use OpenApi\Attributes as OA;

class ProductController extends Controller
{
    #[OA\Get(
        path: '/api/products',
        summary: '商品一覧',
        tags: ['商品'],
        responses: [
            new OA\Response(response: 200, description: '商品一覧取得成功', content: new OA\JsonContent(type: 'array', items: new OA\Items(properties: [
                new OA\Property(property: 'id', type: 'integer', example: 1),
                new OA\Property(property: 'title', type: 'string', example: 'AIイラスト素材セット'),
                new OA\Property(property: 'creator_name', type: 'string', example: '田中 太郎'),
                new OA\Property(property: 'description', type: 'string', example: 'Midjourneyで生成した素材です。'),
                new OA\Property(property: 'file_name', type: 'string', example: 'ai_illustration_set.txt'),
                new OA\Property(property: 'file_size', type: 'integer', example: 228),
                new OA\Property(property: 'download_url', type: 'string', example: 'http://127.0.0.1:8000/api/products/1/download'),
                new OA\Property(property: 'status', type: 'string', example: 'published'),
                new OA\Property(property: 'created_at', type: 'string', example: '2026-05-06T07:24:57.000000Z'),
            ]))),
        ]
    )]
    public function index(): JsonResponse
    {
        $products = Product::where('status', 'published')->get()->map(fn ($p) => $this->format($p));

        return response()->json($products);
    }

    public function receiveSidebarFilter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'selected_tags'    => ['sometimes', 'array'],
            'selected_tags.*'  => ['string', 'max:100'],
            'text'             => ['sometimes', 'nullable', 'string', 'max:255'],
            'content_types'    => ['sometimes', 'array'],
            'content_types.*'  => ['string', 'in:image,video,audio,text,prompt,model'],
        ]);

        $query = Product::where('status', 'published');

        $selectedTags = $validated['selected_tags'] ?? [];
        if (!empty($selectedTags)) {
            $query->whereNotNull('tags');
            foreach ($selectedTags as $tag) {
                $query->whereRaw('(tags)::jsonb @> ?::jsonb', [json_encode([$tag])]);
            }
        }

        $contentTypes = $validated['content_types'] ?? [];
        if (!empty($contentTypes)) {
            $query->whereIn('content_type', $contentTypes);
        }

        if ($text = trim((string) ($validated['text'] ?? ''))) {
            $query->where(function ($q) use ($text) {
                $q->where('title', 'like', "%{$text}%")
                  ->orWhere('description', 'like', "%{$text}%")
                  ->orWhere('creator_name', 'like', "%{$text}%");
            });
        }

        $products = $query->get()->map(fn ($p) => $this->format($p));

        Log::info('[sidebar/filter] リクエスト', [
            'selected_tags' => $selectedTags,
            'content_types' => $contentTypes,
            'text'          => $validated['text'] ?? '',
            'hit_count'     => count($products),
        ]);

        return response()->json($products);
    }

    #[OA\Get(
        path: '/api/products/{id}',
        summary: '商品詳細',
        tags: ['商品'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: '商品詳細取得成功', content: new OA\JsonContent(properties: [
                new OA\Property(property: 'id', type: 'integer', example: 1),
                new OA\Property(property: 'title', type: 'string', example: 'AIイラスト素材セット'),
                new OA\Property(property: 'creator_name', type: 'string', example: '田中 太郎'),
                new OA\Property(property: 'description', type: 'string', example: 'Midjourneyで生成した素材です。'),
                new OA\Property(property: 'download_url', type: 'string', example: 'http://127.0.0.1:8000/api/products/1/download'),
                new OA\Property(property: 'is_purchased', type: 'boolean', example: false),
            ])),
        ]
    )]
    public function show(Request $request, Product $product): JsonResponse
    {
        $isPurchased = $request->user()
            ? Purchase::where('user_id', $request->user()->id)->where('product_id', $product->id)->exists()
            : false;

        return response()->json(array_merge($this->format($product), ['is_purchased' => $isPurchased]));
    }

    #[OA\Get(
        path: '/api/products/{id}/download',
        summary: '商品ダウンロード（購入済みのみ）',
        tags: ['商品'],
        security: [['bearerAuth' => []]],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'ファイルダウンロード成功'),
            new OA\Response(response: 403, description: '未購入'),
            new OA\Response(response: 401, description: '未認証'),
        ]
    )]
    public function download(Request $request, Product $product)
    {
        $isPurchased = Purchase::where('user_id', $request->user()->id)
            ->where('product_id', $product->id)
            ->exists();

        if (! $isPurchased) {
            return response()->json(['message' => 'この商品を購入してからダウンロードしてください。'], 403);
        }

        if (! Storage::disk('local')->exists($product->file_path)) {
            return response()->json(['message' => 'ファイルが見つかりません。'], 404);
        }

        return Storage::disk('local')->download($product->file_path, $product->file_name);
    }

    private function format(Product $product): array
    {
        return [
            'id'           => $product->id,
            'title'        => $product->title,
            'creator_name' => $product->creator_name,
            'description'  => $product->description,
            'file_name'    => $product->file_name,
            'file_size'    => $product->file_size,
            'download_url' => url("/api/products/{$product->id}/download"),
            'status'       => $product->status,
            'tags'         => $product->tags ?? [],
            'content_type' => $product->content_type,
            'created_at'   => $product->created_at,
        ];
    }
}
