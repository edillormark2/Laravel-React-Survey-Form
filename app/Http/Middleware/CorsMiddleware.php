<?php

// app/Http/Middleware/CorsMiddleware.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Log headers for debugging
        \Log::info('CORS Headers:', [
            'Access-Control-Allow-Origin' => $response->headers->get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods' => $response->headers->get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers' => $response->headers->get('Access-Control-Allow-Headers')
        ]);

        return $response
            ->header('Access-Control-Allow-Origin', '*') // Update this for production
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
