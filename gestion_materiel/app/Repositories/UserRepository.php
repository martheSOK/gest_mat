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

    public function update(array $data,$id){
        return User::whereId($id)->first();
    }

    public function delete($id)
    {
        User::destroy($id);

    }
}
