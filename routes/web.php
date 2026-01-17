<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\OrderController;

// Public Routes - User Facing
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');

// Checkout & Purchase History (dummy routes for now)
Route::get('/checkout', function () {
    return Inertia::render('checkout', [
        'ticket' => [
            'id' => 1,
            'type' => 'VIP',
            'price' => 350000,
            'event' => [
                'title' => 'KONSER MUSIK ROCK',
                'date' => '2026-02-15 19:00',
                'location' => 'JAKARTA CONVENTION CENTER',
            ],
        ],
        'quantity' => 2,
    ]);
})->name('checkout');

Route::get('/purchases', [OrderController::class, 'index'])->name('purchases');
Route::post('/purchases', [OrderController::class, 'create'])->name('purchases_stores');

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Category Management
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');

    // Event Management
    Route::get('/events', [AdminEventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [AdminEventController::class, 'create'])->name('events.create');
    Route::get('/events/{id}', [AdminEventController::class, 'show'])->name('events.show');
    Route::get('/events/{id}/edit', [AdminEventController::class, 'edit'])->name('events.edit');

    // Ticket Management
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');

    // Transaction Management
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{id}', [TransactionController::class, 'show'])->name('transactions.show');
});

// Authenticated Routes (original dashboard)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard.old');
});

require __DIR__ . '/settings.php';
