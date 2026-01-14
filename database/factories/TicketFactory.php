<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => fake()->numberBetween(1, 20),
            'type' => fake()->randomElement(['premium', 'reguler']),
            'price' => fake()->numberBetween(10, 100) * 1000,
            'stock' => fake()->numberBetween(1, 10)
        ];
    }
}
