<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->unsignedBigInteger('x_share_count')->default(0)->after('is_featured');
            $table->unsignedBigInteger('linkedin_share_count')->default(0)->after('x_share_count');
            $table->unsignedBigInteger('copy_share_count')->default(0)->after('linkedin_share_count');
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['x_share_count', 'linkedin_share_count', 'copy_share_count']);
        });
    }
};
