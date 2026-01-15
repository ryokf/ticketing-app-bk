<?php

namespace App\Services;

use App\Models\Category;

class CategoryService{
    public function getAllCategories(){
        $categories = [];

        foreach(Category::all() as $category){
            $categories[] = [
                'name' => $category->name
            ];
        }

        return $categories;
    }
}
