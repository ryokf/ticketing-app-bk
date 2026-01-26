<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAllCategories()
    {
        $categories = [];

        foreach (Category::all() as $category) {
            $categories[] = [
                'id' => $category->id,
                'name' => $category->name
            ];
        }

        return $categories;
    }

    /**
     * Get single category by ID
     */
    public function getCategoryById(int $id): ?array
    {
        $category = Category::find($id);

        if (!$category) {
            return null;
        }

        return [
            'id' => $category->id,
            'name' => $category->name
        ];
    }

    /**
     * Create a new category
     */
    public function createCategory(string $name): array
    {
        $category = Category::create([
            'name' => $name
        ]);

        return [
            'id' => $category->id,
            'name' => $category->name
        ];
    }

    /**
     * Update an existing category
     */
    public function updateCategory(int $id, string $name): ?array
    {
        $category = Category::find($id);

        if (!$category) {
            return null;
        }

        $category->update([
            'name' => $name
        ]);

        return [
            'id' => $category->id,
            'name' => $category->name
        ];
    }

    /**
     * Delete a category
     */
    public function deleteCategory(int $id): bool
    {
        $category = Category::find($id);

        if (!$category) {
            return false;
        }

        return $category->delete();
    }
}
