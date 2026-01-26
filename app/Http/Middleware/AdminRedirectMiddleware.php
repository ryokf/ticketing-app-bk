<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is admin and trying to access home page, redirect to admin dashboard
        if (auth()->check() && auth()->user()->isAdmin && $request->path() === '/') {
            return redirect('/admin/dashboard');
        }

        return $next($request);
    }
}
