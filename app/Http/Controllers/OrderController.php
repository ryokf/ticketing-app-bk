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

        return Inertia::render('purchase-history', [
            'purchases' => $data,
        ]);
    }

    public function create(Request $request){
        // dd($request->user());

        $this->orderService->createOrder($request->data);
    }
}
