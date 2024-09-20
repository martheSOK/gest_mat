<?php

namespace App\Repositories;

use App\Interfaces\SalleRepositoryInterface;
use App\Models\Salle;

class SalleRepository implements SalleRepositoryInterface
{
    public function index(){
        $salles=Salle::all();
        return $salles;
    }
    public function getById($id){
        $une_salle=salle::findOrFail($id);
        return $une_salle;

    }
    public function store(array $data){
        return Salle::create($data);

    }

    public function update(array $data,$id){
        return Salle::whereId($id)->update($data);
    }
    public function delete($id){
        Salle::destroy($id);
    }
}
