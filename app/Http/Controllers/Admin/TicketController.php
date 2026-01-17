<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TicketService;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function __construct(protected TicketService $ticketService) {}

    public function index(): Response
    {
        $tickets = $this->ticketService->getAllTicketsForAdmin();

        return Inertia::render('admin/tickets/index', [
            'tickets' => $tickets,
        ]);
    }
}
