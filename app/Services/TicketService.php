<?php

namespace App\Services;

use App\Models\Ticket;

class TicketService
{
    public function getTicketByEvent($eventId)
    {
        $tickets = [];

        foreach (Ticket::where('event_id', $eventId)->get() as $ticket) {
            $tickets[] = [
                'id' => $ticket->id,
                'type' => $ticket->type,
                'price' => $ticket->price,
                'stock' => $ticket->stock
            ];
        }

        return $tickets;
    }

    /**
     * Get all tickets for admin panel with event info and sold calculation
     */
    public function getAllTicketsForAdmin(): array
    {
        $tickets = [];

        $ticketsData = Ticket::with('event')->get();

        foreach ($ticketsData as $ticket) {
            $tickets[] = [
                'id' => $ticket->id,
                'eventTitle' => $ticket->event->title,
                'type' => $ticket->type,
                'price' => $ticket->price,
                'quota' => $ticket->quota,
                'sold' => $ticket->quota - $ticket->available,
                'available' => $ticket->available,
                'createdAt' => $ticket->created_at->format('Y-m-d H:i'),
            ];
        }

        return $tickets;
    }
}
