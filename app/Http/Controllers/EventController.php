<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use App\Services\TicketService;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(protected EventService $eventService, protected TicketService $ticketService) {}

    public function show(int $id): Response
    {
        // Dummy event data
        // $event = [
        //     'id' => $id,
        //     'title' => 'KONSER MUSIK ROCK',
        //     'description' => 'Konser musik rock terbesar tahun ini menampilkan band-band ternama dari seluruh Indonesia. Nikmati pengalaman musik yang tak terlupakan dengan sound system berkualitas tinggi dan lighting spektakuler.',
        //     'date' => '2026-02-15 19:00',
        //     'location' => 'JAKARTA CONVENTION CENTER',
        //     'category' => 'MUSIK',
        //     'image' => 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        //     'tickets' => [
        //         [
        //             'id' => 1,
        //             'type' => 'REGULAR',
        //             'price' => 150000,
        //             'stock' => 500,
        //         ],
        //         [
        //             'id' => 2,
        //             'type' => 'VIP',
        //             'price' => 350000,
        //             'stock' => 100,
        //         ],
        //         [
        //             'id' => 3,
        //             'type' => 'VVIP',
        //             'price' => 750000,
        //             'stock' => 50,
        //         ],
        //     ],
        // ];

        $event = $this->eventService->getDetailEvent($id);

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

        // dd($event);

        return Inertia::render('event-detail', [
            'event' => $event,
        ]);
    }
}
