<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::get('/register', fn () => response()->json([
    'message' => 'Use POST /api/register to create an account.',
]));
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::post('/sidebar/filter', [ProductController::class, 'receiveSidebarFilter']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/purchases', [PurchaseController::class, 'store']);
    Route::get('/user/purchases', [PurchaseController::class, 'index']);
    Route::get('/products/{product}/download', [ProductController::class, 'download']);
});
