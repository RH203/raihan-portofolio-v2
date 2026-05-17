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
    'cv_url',
])]
class Hero extends Model
{
    protected $table = 'heroes';
}
