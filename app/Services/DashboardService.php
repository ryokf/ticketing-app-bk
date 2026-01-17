<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Event;
use App\Models\Order;

class DashboardService
{
    public function __construct(
        protected TransactionService $transactionService
    ) {}

    /**
     * Get dashboard statistics
     */
    public function getDashboardStats(): array
    {
        return [
            'totalEvents' => Event::count(),
            'totalCategories' => Category::count(),
            'totalTransactions' => Order::count(),
            'totalRevenue' => $this->getTotalRevenue(),
        ];
    }

    /**
     * Get recent transactions (last 10)
     */
    public function getRecentTransactions(int $limit = 10): array
    {
        $orders = Order::with('user', 'detailOrders.ticket.event')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        $transactions = [];
        foreach ($orders as $order) {
            // Skip orders without user (orphaned data)
            if (!$order->user) {
                continue;
            }

            $totalPrice = $order->detailOrders->sum('price');

            $transactions[] = [
                'id' => $order->id,
                'orderNumber' => $this->transactionService->generateOrderNumber($order->id),
                'customerName' => $order->user->name,
                'eventName' => $order->detailOrders->first()?->ticket?->event?->title ?? 'N/A',
                'totalPrice' => $totalPrice,
                'date' => $order->created_at->format('Y-m-d H:i'),
            ];
        }

        return $transactions;
    }

    /**
     * Calculate total revenue from all orders
     */
    protected function getTotalRevenue(): int
    {
        return Order::with('detailOrders')
            ->get()
            ->sum(function ($order) {
                return $order->detailOrders->sum('price');
            });
    }
}
