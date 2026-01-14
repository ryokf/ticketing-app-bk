<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = [
            ['id' => 1, 'name' => 'MUSIK'],
            ['id' => 2, 'name' => 'SENI'],
            ['id' => 3, 'name' => 'SEMINAR'],
            ['id' => 4, 'name' => 'OLAHRAGA'],
            ['id' => 5, 'name' => 'WORKSHOP'],
        ];

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
        $category = [
            'id' => $id,
            'name' => 'MUSIK',
        ];

        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }
}
