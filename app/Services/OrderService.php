<?php

namespace App\Services;

use App\Models\DetailOrder;
use App\Models\Order;
use DateTime;

class OrderService {
    public function getOrderByUser($userId){
        $orders = [];
        $ordersData = Order::with(['detailOrders', 'event'])->where('user_id', $userId)->get();

        foreach($ordersData as $order){
            // Skip orders without event
            if (!$order->event) {
                continue;
            }

            $detailOrder = $this->getDetailOrder($order->id);

            $eventTime = new DateTime($order->event->time);
            $purchaseDate = new DateTime($order->created_at);
            $orders[] = [
                'id' => $order->id,
                'orderNumber' => "TKT-2026-$order->id",
                'eventName' => $order->event->title,
                'eventDate' => $eventTime->format('Y-m-d H:i'),
                'eventLocation' => $order->event->location,
                'tickets' => $detailOrder,
                'totalPrice' => $order->total_price,
                'purchaseDate' => $purchaseDate->format('d, M Y H:i'),
            ];
        }

        return $orders;
    }

    public function getDetailOrder($orderId){
        $data = [];
        $detailOrders = DetailOrder::with(['ticket'])->where('order_id', $orderId)->get();

        foreach($detailOrders as $detail){
            $data[] = [
                'type' => $detail->ticket->type,
                'qty' => $detail->quantity,
                'subtotal' => $detail->price
            ];
        }

        return $data;
    }

    public function createOrder($userId, $eventId, $ticketId, $quantity, $totalPrice){
        // Create order
        $order = Order::create([
            'user_id' => $userId,
            'event_id' => $eventId,
            'total_price' => $totalPrice
        ]);

        // Create detail order
        $this->createDetailOrder($order->id, $ticketId, $quantity, $totalPrice);
    }

    public function createDetailOrder($orderId, $ticketId, $quantity, $price){
        DetailOrder::create([
            'order_id' => $orderId,
            'ticket_id' => $ticketId,
            'qty' => $quantity,
            'subtotal' => $price
        ]);
    }
}
