<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SidebarFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_products_array(): void
    {
        $response = $this->postJson('/api/sidebar/filter', [
            'selected_tags' => [],
            'text'          => '',
        ]);

        $response->assertOk()->assertJsonIsArray();
    }

    public function test_it_accepts_content_type_filter(): void
    {
        $response = $this->postJson('/api/sidebar/filter', [
            'content_type' => 'image',
        ]);

        $response->assertOk()->assertJsonIsArray();
    }

    public function test_it_rejects_invalid_content_type(): void
    {
        $response = $this->postJson('/api/sidebar/filter', [
            'content_type' => 'invalid',
        ]);

        $response->assertUnprocessable();
    }
}
