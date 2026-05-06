<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
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
