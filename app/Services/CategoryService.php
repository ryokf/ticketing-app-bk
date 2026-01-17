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
}
