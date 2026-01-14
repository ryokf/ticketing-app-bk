<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Dummy data untuk demo
        $events = [
            [
                'id' => 1,
                'title' => 'KONSER MUSIK ROCK',
                'date' => '2026-02-15 19:00',
                'location' => 'JAKARTA CONVENTION CENTER',
                'category' => 'MUSIK',
                'image' => 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
            ],
            [
                'id' => 2,
                'title' => 'FESTIVAL SENI BUDAYA',
                'date' => '2026-03-20 10:00',
                'location' => 'TAMAN MINI INDONESIA',
                'category' => 'SENI',
                'image' => 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
            ],
            [
                'id' => 3,
                'title' => 'SEMINAR TEKNOLOGI',
                'date' => '2026-04-10 09:00',
                'location' => 'BALAI KARTINI',
                'category' => 'SEMINAR',
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
            ],
        ];

        $categories = [
            ['id' => 1, 'name' => 'MUSIK'],
            ['id' => 2, 'name' => 'SENI'],
            ['id' => 3, 'name' => 'SEMINAR'],
            ['id' => 4, 'name' => 'OLAHRAGA'],
        ];

        return Inertia::render('home', [
            'events' => $events,
            'categories' => $categories,
        ]);
    }
}
