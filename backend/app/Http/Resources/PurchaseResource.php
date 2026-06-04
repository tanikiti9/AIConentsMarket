<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'purchase_id'  => $this->id,
            'purchased_at' => $this->created_at->toIso8601String(),
            'product'      => [
                'id'           => $this->product->id,
                'title'        => $this->product->title,
                'creator_name' => $this->product->creator_name,
                'file_name'    => $this->product->file_name,
                'file_size'    => $this->product->file_size,
                'content_type' => $this->product->content_type,
                'tags'         => $this->product->tags ?? [],
            ],
        ];
    }
}
