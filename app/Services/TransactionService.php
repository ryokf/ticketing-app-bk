<?php

namespace App\Services;

use App\Models\Order;

class TransactionService
{
    /**
     * Get all transactions for admin panel
     */
    public function getAllTransactions(): array
    {
        $transactions = [];

        $orders = Order::with('user', 'detailOrders.ticket.event')->get();

        foreach ($orders as $order) {
            $transactions[] = $this->transformTransactionForList($order);
        }

        return $transactions;
    }

    /**
     * Get single transaction by ID for admin panel
     */
    public function getTransactionById(int $id): ?array
    {
        $transaction = Order::with('user', 'detailOrders.ticket.event')->find($id);

        if (!$transaction) {
            return null;
        }

        return $this->transformTransactionForDetail($transaction);
    }

    /**
     * Generate order number format
     */
    public function generateOrderNumber(int $id): string
    {
        return 'TKT-' . str_pad($id, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Transform transaction for list view
     */
    protected function transformTransactionForList(Order $order): array
    {
        $totalPrice = $order->detailOrders->sum('price');

        return [
            'id' => $order->id,
            'orderNumber' => $this->generateOrderNumber($order->id),
            'customerName' => $order->user->name,
            'customerEmail' => $order->user->email,
            'eventName' => $order->detailOrders->first()?->ticket->event->title ?? 'N/A',
            'ticketQuantity' => $order->detailOrders->count(),
            'totalPrice' => $totalPrice,
            'status' => $order->status ?? 'completed',
            'date' => $order->created_at->format('Y-m-d H:i'),
        ];
    }

    /**
     * Transform transaction for detail view
     */
    protected function transformTransactionForDetail(Order $transaction): array
    {
        $totalPrice = $transaction->detailOrders->sum('price');

        return [
            'id' => $transaction->id,
            'orderNumber' => $this->generateOrderNumber($transaction->id),
            'customerName' => $transaction->user->name,
            'customerEmail' => $transaction->user->email,
            'totalPrice' => $totalPrice,
            'status' => $transaction->status ?? 'completed',
            'date' => $transaction->created_at->format('Y-m-d H:i'),
            'details' => $transaction->detailOrders->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'eventTitle' => $detail->ticket->event->title,
                    'ticketType' => $detail->ticket->type,
                    'price' => $detail->price,
                    'quantity' => $detail->quantity,
                ];
            })->toArray(),
        ];
    }
}
