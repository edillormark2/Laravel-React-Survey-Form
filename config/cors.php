<?php



/*
|--------------------------------------------------------------------------
| Cross-Origin Resource Sharing (CORS) Configuration
|--------------------------------------------------------------------------
|
| Here you may configure your settings for cross-origin resource sharing
| or "CORS". This determines what cross-origin operations may execute
| in web browsers. You are free to adjust these settings as needed.
|
| To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
|
*/

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],
    'allowed_origins' => ['*'], // or specify your frontend URL
    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', '*'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_origins_patterns' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];

