<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ResponsesController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::apiResource('survey', SurveyController::class);

        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/survey/{survey}/responses', [SurveyController::class, 'responses']);
        Route::get('/survey/{survey}/responses/count', [SurveyController::class, 'countResponses']);
        Route::get('/survey/{survey}/responses/{responseId}/details', [SurveyController::class, 'getResponseDetails']);
    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
    Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
});