<?php

namespace App\Repositories;

use App\Interfaces\PretRepositoryInterface;
use App\Models\Pret;

class PretRepository implements PretRepositoryInterface
{
    public function index(){
        $liste_prets = Pret::with('ligne_prets')->get();
        return $liste_prets;

    }
    public function getById($id){
        $un_pret = pret::findOrFail($id);
        return $un_pret;

    }
    public function store(array $data){
        return Pret::create($data);

    }
    public function update(array $data,$id){
        return Pret::whereId($id)->update($data);

    }
    public function delete($id){
        Pret::destroy($id);
    }
}
