<?php

return [

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

    'paths' => ['api/*', 'sanctum/csrf-cookie', '*', 'api/signup', 'api/login', 'api/dashboard'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['https://laravel-react-survey-form.onrender.com', '*', 'https://laravel-react-survey-form.onrender.com/signup', 'https://laravel-react-survey-form.onrender.com/login', 'https://laravel-react-survey-form.onrender.com/dashboard'], // Change this to your frontend URL for security
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

];
