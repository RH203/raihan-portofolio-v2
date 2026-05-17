<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'institution',
    'program',
    'start_year',
    'end_year',
    'description',
    'sort_order',
])]
class Education extends Model
{
    protected $table = 'education';

    protected function casts(): array
    {
        return [
            'start_year' => 'integer',
            'end_year' => 'integer',
            'sort_order' => 'integer',
        ];
    }
}
