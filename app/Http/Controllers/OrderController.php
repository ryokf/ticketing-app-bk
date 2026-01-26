<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\EventService;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService,
        protected EventService $eventService,
        protected TicketService $ticketService
    ) {}

    public function buyNow(Request $request)
    {
        try {
            $userId = auth()->id();

            if (!$userId) {
                return response()->json(['error' => 'Anda harus login terlebih dahulu'], 401);
            }

            // Check if user is admin - admin tidak bisa membeli tiket
            if (auth()->user()->isAdmin) {
                return response()->json(['error' => 'Admin tidak dapat membeli tiket'], 403);
            }

            $validated = $request->validate([
                'event_id' => 'required|integer|exists:events,id',
                'ticket_id' => 'required|integer|exists:tickets,id',
                'quantity' => 'required|integer|min:1',
            ]);

            // Get ticket price to calculate total
            $ticket = \App\Models\Ticket::find($validated['ticket_id']);

            if (!$ticket) {
                return response()->json(['error' => 'Tiket tidak ditemukan'], 404);
            }

            $totalPrice = $ticket->price * $validated['quantity'];

            // Create the order
            $this->orderService->createOrder(
                $userId,
                $validated['event_id'],
                $validated['ticket_id'],
                $validated['quantity'],
                $totalPrice
            );

            return response()->json([
                'success' => true,
                'message' => 'Pembelian tiket berhasil!'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Data tidak valid: ' . implode(', ', array_map(function($errors) {
                    return is_array($errors) ? implode(', ', $errors) : $errors;
                }, $e->errors()))
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Buy ticket error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Terjadi kesalahan saat memproses pembelian: ' . $e->getMessage()
            ], 500);
        }
    }

    public function checkout(int $eventId, int $ticketId)
    {
        // Get event and ticket data
        $event = $this->eventService->getDetailEvent($eventId);

        if (!$event) {
            abort(404, 'Event tidak ditemukan');
        }

        // Find the specific ticket
        $ticket = collect($event['tickets'] ?? [])->firstWhere('id', $ticketId);

        if (!$ticket) {
            abort(404, 'Tiket tidak ditemukan');
        }

        // Get quantity from query parameter or default to 1
        $quantity = request()->query('quantity', 1);

        return Inertia::render('checkout', [
            'event' => [
                'id' => $event['id'],
                'title' => $event['title'],
                'date' => $event['date'],
                'location' => $event['location'],
            ],
            'ticket' => [
                'id' => $ticket['id'],
                'type' => $ticket['type'],
                'price' => $ticket['price'],
            ],
            'quantity' => (int)$quantity,
        ]);
    }

    public function index()
    {
        $userId = auth()->id();

        if (!$userId) {
            return redirect('/login');
        }

        $data = $this->orderService->getOrderByUser($userId);

        return Inertia::render('purchase-history', [
            'purchases' => $data,
        ]);
    }

    public function create(Request $request)
    {
        $userId = auth()->id();

        if (!$userId) {
            return back()->withErrors(['error' => 'Anda harus login terlebih dahulu']);
        }

        $validated = $request->validate([
            'event_id' => 'required|integer|exists:events,id',
            'ticket_id' => 'required|integer|exists:tickets,id',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:20',
        ]);

        // Create the order
        $this->orderService->createOrder(
            $userId,
            $validated['event_id'],
            $validated['ticket_id'],
            $validated['quantity'],
            $validated['total_price']
        );

        return redirect()->route('purchases')
            ->with('message', 'Pembelian tiket berhasil! Silakan cek riwayat pembelian Anda.');
    }
}
