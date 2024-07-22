<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use App\Http\Middleware\CorsMiddleware;

class CorsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Register middleware globally
        $this->app['router']->middleware('cors', CorsMiddleware::class);

        // Optionally, register middleware for API routes
        $this->app['router']->group([
            'middleware' => ['cors'],
            'prefix' => 'api',
        ], function (Router $router) {
            require base_path('routes/api.php');
        });
    }

    public function register()
    {
        //
    }
}
