<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use OpenApi\Attributes as OA;

class PurchaseController extends Controller
{
    #[OA\Get(
        path: '/api/user/purchases',
        summary: '購入済み一覧',
        tags: ['購入'],
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: '購入済み一覧取得成功', content: new OA\JsonContent(properties: [
                new OA\Property(property: 'data', type: 'array', items: new OA\Items(properties: [
                    new OA\Property(property: 'purchase_id', type: 'integer', example: 1),
                    new OA\Property(property: 'purchased_at', type: 'string', example: '2026-05-01T10:00:00+09:00'),
                    new OA\Property(property: 'product', type: 'object', properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 3),
                        new OA\Property(property: 'title', type: 'string', example: 'AIイラスト素材セット'),
                        new OA\Property(property: 'creator_name', type: 'string', example: '田中 太郎'),
                        new OA\Property(property: 'file_name', type: 'string', example: 'sample.zip'),
                        new OA\Property(property: 'file_size', type: 'integer', example: 15728640),
                        new OA\Property(property: 'content_type', type: 'string', example: 'illustration'),
                        new OA\Property(property: 'tags', type: 'array', items: new OA\Items(type: 'string')),
                    ]),
                ])),
            ])),
            new OA\Response(response: 401, description: '未認証'),
        ]
    )]
    public function index(Request $request): AnonymousResourceCollection
    {
        $purchases = $request->user()
            ->purchases()
            ->with('product')
            ->latest()
            ->get();

        return PurchaseResource::collection($purchases);
    }

    #[OA\Post(
        path: '/api/purchases',
        summary: '商品を購入する（無料）',
        tags: ['購入'],
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(properties: [
            new OA\Property(property: 'product_id', type: 'integer', example: 1),
        ])),
        responses: [
            new OA\Response(response: 201, description: '購入成功', content: new OA\JsonContent(properties: [
                new OA\Property(property: 'message', type: 'string', example: '購入が完了しました。'),
                new OA\Property(property: 'product_id', type: 'integer', example: 1),
                new OA\Property(property: 'title', type: 'string', example: 'AIイラスト素材セット'),
            ])),
            new OA\Response(response: 409, description: 'すでに購入済み'),
            new OA\Response(response: 401, description: '未認証'),
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $user    = $request->user();
        $product = Product::findOrFail($data['product_id']);

        $alreadyPurchased = Purchase::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->exists();

        if ($alreadyPurchased) {
            return response()->json(['message' => 'すでに購入済みです。'], 409);
        }

        Purchase::create([
            'user_id'    => $user->id,
            'product_id' => $product->id,
        ]);

        return response()->json([
            'message'    => '購入が完了しました。',
            'product_id' => $product->id,
            'title'      => $product->title,
        ], 201);
    }
}
