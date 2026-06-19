<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'role',
    'headline',
    'description',
    'primary_cta_text',
    'secondary_cta_text',
    'photo_url',
    'photo_processing_status',
    'cv_url',
    'develop_mode',
    'is_open_to_work',
])]
class Hero extends Model
{
    protected $table = 'heroes';

    protected function casts(): array
    {
        return [
            'develop_mode' => 'boolean',
            'is_open_to_work' => 'boolean',
        ];
    }
}
