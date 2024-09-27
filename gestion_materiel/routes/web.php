<?php

use App\Http\Controllers\DocumentationController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/',[DocumentationController::class, 'ListController']);
Route::get('/auth',[DocumentationController::class, 'AuthMethodes'])->name('auth');
Route::get('/user',[DocumentationController::class, 'UsersMethodes'])->name('user');
Route::get('/type_materiel',[DocumentationController::class, 'TypesMethodes'])->name('type');
Route::get('/salle',[DocumentationController::class, 'SalleMethodes'])->name('salle');

