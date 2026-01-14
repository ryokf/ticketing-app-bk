<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'totalEvents' => 12,
            'totalCategories' => 8,
            'totalTransactions' => 156,
            'totalRevenue' => 45750000,
        ];

        $recentTransactions = [
            [
                'id' => 1,
                'orderNumber' => 'TKT-2026-001',
                'customerName' => 'BUDI SANTOSO',
                'eventName' => 'KONSER MUSIK ROCK',
                'totalPrice' => 350000,
                'date' => '2026-01-14 10:30',
            ],
            [
                'id' => 2,
                'orderNumber' => 'TKT-2026-002',
                'customerName' => 'SITI NURHALIZA',
                'eventName' => 'FESTIVAL SENI BUDAYA',
                'totalPrice' => 150000,
                'date' => '2026-01-14 11:15',
            ],
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
