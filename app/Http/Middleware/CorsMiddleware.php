<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $frontendUrl = env('FRONTEND_URL', '*');

        $response->headers->set('Access-Control-Allow-Origin', $frontendUrl);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN');

        // Handle OPTIONS requests
        if ($request->isMethod('OPTIONS')) {
            return $response->setStatusCode(200);
        }

        return $response;
    }
}
