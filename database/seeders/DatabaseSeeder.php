<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'ryokf',
            'email' => 'ryokf@gmail.com',
            'password' => Hash::make('rahasia123'),
            'isAdmin' => true
        ]);

        $this->call([
            CategorySeeder::class,
            EventSeeder::class,
            TicketSeeder::class,
            OrderSeeder::class,
            DetailOrderSeeder::class
        ]);
    }
}
