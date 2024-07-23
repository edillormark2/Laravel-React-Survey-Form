<?php

use Laravel\Sanctum\Sanctum;


return [
    'stateful' => explode(',', env(
        'SANCTUM_STATEFUL_DOMAINS',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1,laravel-react-survey-form.onrender.com'
    )
    ),
    'guard' => ['web'],
    'expiration' => null,
    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),
    'middleware' => [
        'verify_csrf_token' => \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => \Illuminate\Cookie\Middleware\EncryptCookies::class,
        'add_queued_cookies_to_response' => \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    ],
];
