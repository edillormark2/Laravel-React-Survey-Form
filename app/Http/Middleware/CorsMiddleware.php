<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->getMethod() === "OPTIONS") {
            return response()->json('{"method":"OPTIONS"}', 200, $this->getHeaders());
        }

        $response = $next($request);
        foreach ($this->getHeaders() as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }

    private function getHeaders()
    {
        return [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, Origin, X-Auth-Token, X-Requested-With',
        ];
    }
}
