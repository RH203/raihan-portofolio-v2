<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'platform',
    'url',
    'is_active',
    'sort_order',
])]
class SocialLink extends Model
{
    protected $casts = [
        'is_active' => 'boolean',
    ];
}
