<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait ClearsPortfolioCache
{
    protected function clearPortfolioCache(): void
    {
        Cache::forget('portfolio_data');
    }
}
