<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title',
    'organization',
    'location',
    'start_date',
    'end_date',
    'is_current',
    'description',
    'achievements',
    'sort_order',
])]
class Experience extends Model
{
    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'achievements' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
