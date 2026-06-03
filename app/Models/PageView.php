<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    protected $fillable = ['date', 'count'];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }

    public static function recordToday(): void
    {
        static::firstOrCreate(
            ['date' => today()->toDateString()],
            ['count' => 0]
        )->increment('count');
    }
}
