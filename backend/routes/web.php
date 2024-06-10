<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BookController;


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

Route::get('/test-db', [App\Http\Controllers\TestController::class, 'testDatabaseConnection']);

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection is working!';
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage();
    }
});

Route::get('/api/books', [BookController::class, 'index']);
Route::post('/api/books', [BookController::class, 'store']);
Route::get('/api/books/{google_books_id}', [BookController::class, 'show']);
Route::put('/api/books/{google_books_id}', [BookController::class, 'update']);
Route::delete('/api/books/{google_books_id}', [BookController::class, 'destroy']);
