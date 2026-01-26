<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        $this->categoryService->createCategory($validated['name']);

        return redirect()->route('admin.categories.index')->with('message', 'Kategori berhasil ditambahkan');
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

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);

        $updated = $this->categoryService->updateCategory($id, $validated['name']);

        if (!$updated) {
            abort(404);
        }

        return redirect()->route('admin.categories.index')->with('message', 'Kategori berhasil diupdate');
    }

    public function destroy(int $id): RedirectResponse
    {
        $deleted = $this->categoryService->deleteCategory($id);

        if (!$deleted) {
            abort(404);
        }

        return redirect()->route('admin.categories.index')->with('message', 'Kategori berhasil dihapus');
    }
}
