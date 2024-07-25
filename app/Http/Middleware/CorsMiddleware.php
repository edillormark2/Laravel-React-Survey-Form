<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 204);
        }

        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        $response->headers->set('Access-Control-Expose-Headers', '');
        $response->headers->set('Access-Control-Max-Age', '0');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
