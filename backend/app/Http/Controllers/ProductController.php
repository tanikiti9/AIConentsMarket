<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::where('status', 'published')->get()->map(fn ($p) => $this->format($p));

        return response()->json($products);
    }

    public function show(Request $request, Product $product): JsonResponse
    {
        $isPurchased = $request->user()
            ? Purchase::where('user_id', $request->user()->id)->where('product_id', $product->id)->exists()
            : false;

        return response()->json(array_merge($this->format($product), ['is_purchased' => $isPurchased]));
    }

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
            'description'  => $product->description,
            'price'        => $product->price,
            'is_free'      => $product->price === 0,
            'file_name'    => $product->file_name,
            'file_size'    => $product->file_size,
            'download_url' => url("/api/products/{$product->id}/download"),
            'status'       => $product->status,
            'created_at'   => $product->created_at,
        ];
    }
}
