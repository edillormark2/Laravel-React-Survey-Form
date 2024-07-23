<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/me', [AuthController::class, 'me'])->name('me');
    Route::apiResource('survey', SurveyController::class);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('index');
    Route::get('/survey/{survey}/responses', [SurveyController::class, 'responses']);
    Route::get('/survey/{survey}/responses/count', [SurveyController::class, 'countResponses']);
    Route::get('/survey/{survey}/responses/{responseId}/details', [SurveyController::class, 'getResponseDetails']);
});

Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug'])->name('getBySlug');
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer'])->name('storeAnswer');

