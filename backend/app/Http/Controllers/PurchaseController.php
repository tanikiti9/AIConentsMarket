<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PurchaseController extends Controller
{
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
