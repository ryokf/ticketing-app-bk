<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use App\Services\EventService;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(
        protected EventService $eventService,
        protected CategoryService $categoryService,
        protected TicketService $ticketService
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

        // Load tickets for this event
        $tickets = $this->ticketService->getTicketByEvent($id);
        $event['tickets'] = $tickets;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'location' => 'required|string|max:250',
            'date' => 'required|date',
            'category_id' => 'nullable|exists:categories,id',
            'new_category' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048', // 2MB max
        ]);

        $imageFile = $request->file('image');

        $this->eventService->createEvent($validated, $imageFile);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event berhasil ditambahkan!');
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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:100',
            'description' => 'sometimes|required|string',
            'location' => 'sometimes|required|string|max:250',
            'date' => 'sometimes|required|date',
            'category_id' => 'nullable|exists:categories,id',
            'new_category' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048',
        ]);

        $imageFile = $request->file('image');

        $this->eventService->updateEvent($id, $validated, $imageFile);

        return redirect()->route('admin.events.show', $id)
            ->with('success', 'Event berhasil diupdate!');
    }

    public function destroy($id)
    {
        $this->eventService->deleteEvent($id);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event berhasil dihapus!');
    }

    // Ticket Management Methods

    public function storeTicket(Request $request, $eventId)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:1',
        ]);

        $this->ticketService->createTicket($eventId, $validated);

        return redirect()->route('admin.events.show', $eventId)
            ->with('success', 'Tiket berhasil ditambahkan!');
    }

    public function updateTicket(Request $request, $eventId, $ticketId)
    {
        $validated = $request->validate([
            'type' => 'sometimes|required|string|max:100',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:1',
        ]);

        $this->ticketService->updateTicket($ticketId, $validated);

        return redirect()->route('admin.events.show', $eventId)
            ->with('success', 'Tiket berhasil diupdate!');
    }

    public function destroyTicket($eventId, $ticketId)
    {
        $this->ticketService->deleteTicket($ticketId);

        return redirect()->route('admin.events.show', $eventId)
            ->with('success', 'Tiket berhasil dihapus!');
    }
}
