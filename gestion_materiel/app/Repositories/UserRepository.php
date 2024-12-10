<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function index(){
        return User::all();
    }


    public function getById($id)
    {
        $un_user = User::findOrFail($id);
        return $un_user;
    }

    public function store(array $data)
    {
       return User::create($data);
    }

    public function update(array $data, $id) {
        $user = User::find($id);

        if ($user) {
            // Mettre à jour les attributs de l'utilisateur avec les nouvelles données
            $user->update($data);
        }
        // Retourner l'utilisateur mis à jour
        return $user;
    }


    public function delete($id)
    {
        User::destroy($id);

    }
}
