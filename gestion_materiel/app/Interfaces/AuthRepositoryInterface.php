<?php

namespace App\Interfaces;

interface AuthRepositoryInterface
{
    //

    public function register(array $data);
    public function login(string $email,string $password);
   

}
