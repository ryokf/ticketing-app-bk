<?php

namespace Database\Seeders;

use App\Models\DetailOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DetailOrder::factory()->count(60)->create();
    }
}
