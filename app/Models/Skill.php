<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'category',
    'icon',
    'sort_order',
])]
class Skill extends Model
{
    public const CATEGORIES = [
        'Frontend',
        'Backend',
        'Database',
        'DevOps',
        'Tools',
        'UI/UX',
        'Other',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }
}
