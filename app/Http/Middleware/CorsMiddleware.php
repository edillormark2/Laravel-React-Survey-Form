<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', '*, https://laravel-react-survey-form.onrender.com,https://laravel-react-survey-form.onrender.com/signup,https://laravel-react-survey-form.onrender.com/login,https://laravel-react-survey-form.onrender.com/dashboard'); // Replace '*' with your allowed origins
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN');

        // Handle OPTIONS requests
        if ($request->isMethod('OPTIONS')) {
            return $response;
        }

        return $response;
    }
}
