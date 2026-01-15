<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Services\EventService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(protected EventService $eventService, protected CategoryService $categoryService) {}

    public function index(): Response
    {
        $events = $this->eventService->getAllEvent();
        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('home', [
            'events' => $events,
            'categories' => $categories,
        ]);
    }
}
