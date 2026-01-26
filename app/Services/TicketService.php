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

    /**
     * Create a new ticket for an event
     */
    public function createTicket(int $eventId, array $data): Ticket
    {
        // Create ticket
        $ticket = Ticket::create([
            'event_id' => $eventId,
            'type' => $data['type'],
            'price' => $data['price'],
            'stock' => $data['stock'],
        ]);

        return $ticket;
    }

    /**
     * Update an existing ticket
     */
    public function updateTicket(int $ticketId, array $data): Ticket
    {
        $ticket = Ticket::findOrFail($ticketId);

        $ticket->update([
            'type' => $data['type'] ?? $ticket->type,
            'price' => $data['price'] ?? $ticket->price,
            'stock' => $data['stock'] ?? $ticket->stock,
        ]);

        return $ticket;
    }

    /**
     * Delete a ticket
     */
    public function deleteTicket(int $ticketId): bool
    {
        $ticket = Ticket::findOrFail($ticketId);
        return $ticket->delete();
    }
}
