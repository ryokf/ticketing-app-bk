<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $dashboardService) {}

    public function index(): Response
    {
        $stats = $this->dashboardService->getDashboardStats();
        $recentTransactions = $this->dashboardService->getRecentTransactions(10);

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
