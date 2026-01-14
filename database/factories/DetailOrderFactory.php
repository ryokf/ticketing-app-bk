<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailOrder>
 */
class DetailOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => fake()->numberBetween(1, 10),
            'ticket_id' => fake()->numberBetween(1, 20),
            'qty' => fake()->numberBetween(1, 10),
            'subtotal' => fake()->numberBetween(10, 15) * 1000
        ];
    }
}
