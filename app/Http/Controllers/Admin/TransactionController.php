<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TransactionService;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function __construct(protected TransactionService $transactionService) {}

    public function index(): Response
    {
        $transactions = $this->transactionService->getAllTransactions();

        return Inertia::render('admin/transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    public function show($id): Response
    {
        $transaction = $this->transactionService->getTransactionById($id);

        if (!$transaction) {
            abort(404);
        }

        return Inertia::render('admin/transactions/show', [
            'transaction' => $transaction,
        ]);
    }
}
