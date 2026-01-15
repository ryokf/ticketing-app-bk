<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use App\Services\TicketService;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(protected EventService $eventService) {}

    public function show(int $id): Response
    {
        $event = $this->eventService->getDetailEvent($id);

        return Inertia::render('event-detail', [
            'event' => $event,
        ]);
    }
}
