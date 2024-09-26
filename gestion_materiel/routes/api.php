<?php

use App\Http\Controllers\AuthController;
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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('type_materiels' ,TypeMaterielController::class);

//route pour assigné et détacher le matériel a un post
Route::post('posts/{post_id}/assign-materiels', [MaterielController::class, 'assignToPoste']);
Route::post('materiel/detach', [MaterielController::class, 'detachMaterielsFromPost']);

Route::apiResource('materiels' ,MaterielController::class);
Route::apiResource('composants' ,ComposantController::class);
Route::apiResource('posts' ,PostController::class);
Route::apiResource('salles' ,SalleController::class);
Route::apiResource('users' ,UserController::class);
Route::apiResource('prets' ,PretController::class);


Route::get('post/disponibles', [PostController::class,'postsDisponible']);
Route::get('post/partiellementDisponibles', [PostController::class,'postsPartiellementDisponible']);
Route::get('materiel/assignables', [MaterielController::class, 'AssignMaterials']);


Route::post('posts/{post}/assigne/users' ,[PostController::class,'assigneUsers']);
Route::post('posts/{post}/detach/users' ,[PostController::class,'detachUsers']);


//route pour la gestion des lignes de prêt
Route::get('lignePrets/{pret_id}', [LignePretController::class, 'index']);

//Route::post('lignePrets/{pret_id}/{materiel_id}', [LignePretController::class, 'store']);

Route::get('lignePrets/lignePret_show/{lignePret}',[LignePretController::class, 'show']);
Route::put('lignePrets/{lignePret}' , [LignePretController::class , 'update']);
Route::delete('lignePrets/{lignePret}' , [LignePretController::class , 'destroy']);

//route pour l'inventaire
Route::get('inventaire/statistiques/{dateDebut}/{dateFin}',[InventaireController::class, 'afficherStatistiquesMateriel']);

//route pour faire l'historique d'utilisation du matériel
Route::get('historiqueDutilisation/{materielId}',[InventaireController::class, 'getUsersUsingMateriel']);

//route pour l'authentification
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
