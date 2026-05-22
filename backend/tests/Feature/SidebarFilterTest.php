<?php

namespace Tests\Feature;

use Tests\TestCase;

class SidebarFilterTest extends TestCase
{
    public function test_it_receives_sidebar_tags_and_text(): void
    {
        $response = $this->postJson('/api/sidebar/filter', [
            'selected_tags' => ['anime', 'fantasy'],
            'text'          => 'Prompt',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('selected_tags', ['anime', 'fantasy'])
            ->assertJsonPath('text', 'Prompt');
    }
}
