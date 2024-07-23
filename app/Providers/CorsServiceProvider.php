<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use App\Http\Middleware\CorsMiddleware;

class CorsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // This will register the middleware in the route middleware stack
        $router = $this->app['router'];

        // Register middleware for API routes
        $router->aliasMiddleware('cors', CorsMiddleware::class);

        // Optionally, apply the middleware globally or for specific route groups
        // Note: For global middleware, use app/Http/Kernel.php instead

        // Register middleware for API routes
        $router->group([
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
