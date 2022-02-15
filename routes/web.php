<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ImageController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('users')->group(function (){
    Route::get('fetch',[UserController::class, 'fetch']);
    Route::get('fetch/{user}',[UserController::class, 'show']);
    Route::get('index',[UserController::class, 'index']);
});

Route::prefix('posts')->group(function (){
    Route::post('fetch',[PostController::class, 'index']);
    Route::get('fetch/{post}',[PostController::class, 'fetch']);
    Route::post('create', [PostController::class, 'store'])->middleware('auth');
});

Route::prefix('images')->group(function (){
    Route::post('create',[ImageController::class, 'store']);
});

Route::post('comments/create', [CommentController::class, 'store'])->middleware('auth');

require __DIR__.'/auth.php';

Route::get('/{any}', function(){
    return Inertia::render('app', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->where('any', '.*');