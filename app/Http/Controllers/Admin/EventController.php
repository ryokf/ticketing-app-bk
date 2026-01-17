<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use App\Services\EventService;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(
        protected EventService $eventService,
        protected CategoryService $categoryService
    ) {}

    public function index(): Response
    {
        $events = $this->eventService->getAllEventsForAdmin();

        return Inertia::render('admin/events/index', [
            'events' => $events,
        ]);
    }

    public function show($id): Response
    {
        $event = $this->eventService->getDetailEvent($id);

        if (!$event) {
            abort(404);
        }

        return Inertia::render('admin/events/show', [
            'event' => $event,
        ]);
    }

    public function create(): Response
    {
        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('admin/events/create', [
            'categories' => $categories,
        ]);
    }

    public function edit($id): Response
    {
        $event = $this->eventService->getDetailEvent($id);

        if (!$event) {
            abort(404);
        }

        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('admin/events/edit', [
            'event' => $event,
            'categories' => $categories,
        ]);
    }
}
