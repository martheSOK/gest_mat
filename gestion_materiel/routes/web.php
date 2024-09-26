<?php

use App\Http\Controllers\DocumentationController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/',[DocumentationController::class, 'ListController']);
Route::get('/auth',[DocumentationController::class, 'AuthMethodes'])->name('auth');
