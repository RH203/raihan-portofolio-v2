<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title',
    'thumbnail_url',
    'description',
    'technologies',
    'demo_url',
    'repository_url',
    'category',
    'is_featured',
    'sort_order',
])]
class Project extends Model
{
    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
