<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Set CORS headers
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Auth-Token, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        // Handle OPTIONS preflight requests
        if ($request->isMethod('options')) {
            $response->setStatusCode(200);
        }

        return $response;
    }
}

