<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Here you may specify a list of domains that should be allowed to make
    | cross-origin requests. By default, this array is empty, meaning that
    | no origins are allowed to make cross-origin requests.
    |
    */

    'allowed_origins' => [
        'https://laravel-react-survey-form.onrender.com',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    |
    | Here you may specify a list of headers that should be allowed when making
    | cross-origin requests. By default, this array is empty, meaning that
    | all headers are allowed.
    |
    */

    'allowed_headers' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    |
    | Here you may specify a list of HTTP methods that should be allowed when
    | making cross-origin requests. By default, this array is empty, meaning
    | that all methods are allowed.
    |
    */

    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | Here you may specify a list of headers that should be exposed to the
    | browser when making cross-origin requests. By default, this array is
    | empty, meaning that no additional headers are exposed.
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | Here you may specify the number of seconds that the results of a preflight
    | request can be cached by the browser. By default, this value is 0,
    | meaning that the browser should not cache the results.
    |
    */

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Here you may specify whether or not the CORS headers should include the
    | `Access-Control-Allow-Credentials` header. If set to true, this allows
    | credentials to be sent with cross-origin requests.
    |
    */

    'supports_credentials' => false,
];
