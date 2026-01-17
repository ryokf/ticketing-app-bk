<?php

namespace App\Services;

use App\Models\Event;

class EventService
{
    public function __construct(protected TicketService $ticketService) {}

    public function getAllEvent()
    {
        $events = [];

        foreach (Event::all() as $event) {
            $events[] = [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->time,
                'location' => $event->location,
                'category' => $event->category->name,
                'image' => $event->photo,
            ];
        }

        return $events;
    }

    public function getDetailEvent($id)
    {
        $event = Event::with(['ticket'])->find($id);

        $event = [
            'id' => $event->id,
            'user_id' => $event->user_id,
            'title' => $event->title,
            'description' => $event->description,
            'date' => $event->time,
            'location' => $event->location,
            'category' => $event->category->name,
            'image' => $event->photo,
        ];


        $event['tickets'] = $this->ticketService->getTicketByEvent($id);

        return $event;
    }

    /**
     * Get all events for admin panel with category, user, and formatted dates
     */
    public function getAllEventsForAdmin(): array
    {
        $events = [];

        $eventsData = Event::with('category', 'user')->get();

        foreach ($eventsData as $event) {
            $events[] = [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name ?? 'N/A',
                'location' => $event->location,
                'date' => $event->time,
                'createdBy' => $event->user?->name ?? 'Unknown',
                'createdAt' => $event->created_at->format('Y-m-d H:i'),
            ];
        }

        return $events;
    }
}
