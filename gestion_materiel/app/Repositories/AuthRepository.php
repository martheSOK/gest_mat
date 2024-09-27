<?php

namespace App\Repositories;

use App\Interfaces\AuthRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthRepositoryInterface
{
    /**
     * Create a new class instance.
     */


    public function register(array $data)
        {
            // Création de l'utilisateur avec les données fournies
            $user = User::create($data);

            // Création du token d'accès pour l'utilisateur
            $token = $user->createToken($user->name); // J'utilisez le nom de l'utilisateur pour le token

            return [
                'user' => $user,
                'token' => $token->plainTextToken
            ];
        }


    public function login($email, $password)
        {
            $user = User::where('email', $email)->first();

            if (!$user || !Hash::check($password, $user->password)) {
                return null; // ou lancer une exception selon votre logique
            }

            return $user; // Retourne l'utilisateur si la connexion est réussie
        }


}
