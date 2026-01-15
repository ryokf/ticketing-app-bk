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
}
