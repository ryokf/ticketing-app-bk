<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $categoryService) {}

    public function index(): Response
    {
        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    public function edit(int $id): Response
    {
        $category = $this->categoryService->getCategoryById($id);

        if (!$category) {
            abort(404);
        }

        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }
}
