<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Middleware\TrustProxies;
use App\Http\Middleware\CorsMiddleware;

class CorsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Add middleware to the global stack
        $this->app['router']->middleware('cors', CorsMiddleware::class);

        // Register middleware for the API routes
        $this->app['router']->group([
            'middleware' => ['cors'],
            'prefix' => 'api',
        ], function ($router) {
            require base_path('routes/api.php');
        });
    }

    public function register()
    {
        //
    }
}
