<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    public function index()
    {
        $data = $this->orderService->getOrderByUser(1);

        // dd($data);

        return Inertia::render('purchase-history', [
            'purchases' => $data,
        ]);
    }
}

// 'purchases' => [
//     [
//         'id' => 1,
//         'orderNumber' => 'TKT-2026-001',
//         'eventName' => 'KONSER MUSIK ROCK',
//         'eventDate' => '2026-02-15 19:00',
//         'eventLocation' => 'JAKARTA CONVENTION CENTER',
//         'ticketType' => 'VIP',
//         'quantity' => 2,
//         'totalPrice' => 700000,
//         'purchaseDate' => '2026-01-14 10:30',
//     ],
// ],
