<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 5),
            'category_id' => fake()->numberBetween(1, 6),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'location' => fake()->word(),
            'time' => fake()->dateTime(),
            'photo' => "https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/hiking_dog_mountain"
        ];
    }
}
