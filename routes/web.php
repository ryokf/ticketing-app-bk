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
Route::middleware(\App\Http\Middleware\AdminRedirectMiddleware::class)->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
});

// Logout Route
Route::post('/logout', function () {
    auth()->logout();
    session()->invalidate();
    session()->regenerateToken();
    return response()->json(['success' => true]);
})->middleware('auth')->name('logout');

Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');

// Checkout & Purchase History
Route::get('/checkout/{eventId}/{ticketId}', [OrderController::class, 'checkout'])->name('checkout');
Route::post('/buy-now', [OrderController::class, 'buyNow'])->name('buy-now')->middleware('auth');
Route::get('/purchases', [OrderController::class, 'index'])->name('purchases');
Route::post('/purchases', [OrderController::class, 'create'])->name('purchases.store');

// Admin Routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Category Management
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Event Management
    Route::get('/events', [AdminEventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [AdminEventController::class, 'create'])->name('events.create');
    Route::post('/events', [AdminEventController::class, 'store'])->name('events.store');
    Route::get('/events/{id}', [AdminEventController::class, 'show'])->name('events.show');
    Route::get('/events/{id}/edit', [AdminEventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{id}', [AdminEventController::class, 'update'])->name('events.update');
    Route::delete('/events/{id}', [AdminEventController::class, 'destroy'])->name('events.destroy');

    // Ticket Management (within events)
    Route::post('/events/{eventId}/tickets', [AdminEventController::class, 'storeTicket'])->name('events.tickets.store');
    Route::put('/events/{eventId}/tickets/{ticketId}', [AdminEventController::class, 'updateTicket'])->name('events.tickets.update');
    Route::delete('/events/{eventId}/tickets/{ticketId}', [AdminEventController::class, 'destroyTicket'])->name('events.tickets.destroy');

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
