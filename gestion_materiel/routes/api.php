<?php

use App\Http\Controllers\ComposantController;
use App\Http\Controllers\InventaireController;
use App\Http\Controllers\LignePretController;
use App\Http\Controllers\MaterielController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PretController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\TypeMaterielController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('type_materiels' ,TypeMaterielController::class);
Route::apiResource('materiels' ,MaterielController::class);
Route::apiResource('composants' ,ComposantController::class);
Route::apiResource('posts' ,PostController::class);
Route::apiResource('salles' ,SalleController::class);
Route::apiResource('users' ,UserController::class);
Route::apiResource('prets' ,PretController::class);

Route::post('posts/{post}/assigne/users' ,[PostController::class,'assigneUsers']);
Route::post('posts/{post}/detach/users' ,[PostController::class,'detachUsers']);

Route::post('materiels/{materiel_id}/assigne/post/{post_id}' ,[MaterielController::class,'assignToPoste']);
Route::get('lignePrets/{pret_id}', [LignePretController::class, 'index']);
//Route::post('lignePrets/{pret_id}/{materiel_id}', [LignePretController::class, 'store']);

Route::get('lignePrets/lignePret_show/{lignePret}',[LignePretController::class, 'show']);
Route::put('lignePrets/{lignePret}' , [LignePretController::class , 'update']);
Route::delete('lignePrets/{lignePret}' , [LignePretController::class , 'destroy']);

Route::get('/inventaire/statistiques/{dateDebut}/{dateFin}',[InventaireController::class, 'afficherStatistiquesMateriel']);
Route::get('/historiqueDutilisation',[InventaireController::class, 'historiqueMateriel']);
