<?php

namespace App\Services;

use App\Models\DetailOrder;
use App\Models\Order;
use DateTime;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Date;

class OrderService{
    public function getOrderByUser($userId){
        $orders = [];
        $ordersData = Order::with(['detailOrders'])->where('user_id', $userId)->get();

        foreach($ordersData as $order){
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
                'qty' => $detail->qty,
                'subtotal' => $detail->subtotal
            ];
        }

        return $data;
    }

    public function createOrder($data){
        $userId = auth()->id();

        Order::create([
            'user_id' => $userId,
            'event_id' => $data['event_id'],
            'total_price' => $data['total_price']
        ]);

        $orderId = Order::latest()->first()->id;

        $this->createDetailOrder([$orderId, $data['tickets'], $data['ticket_qty'], $data['total_price']]);
    }

    public function createDetailOrder($data){
        DetailOrder::create([
            'order_id' => $data[0],
            'ticket_id' => $data[1],
            'qty' => $data[2],
            'subtotal' => $data[3]
        ]);
    }
}
