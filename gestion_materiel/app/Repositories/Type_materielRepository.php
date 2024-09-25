<?php

namespace App\Repositories;

use App\Interfaces\Type_materielRepositoryInterface;
use App\Models\Type_materiel;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Type_materielRepository implements Type_materielRepositoryInterface
{
    public function index(){
        return Type_materiel::all();
    }


    public function getById($id)
    {
        // Récupération automatique ou exception levée si non trouvé
        return Type_materiel::findOrFail($id);
    }



    public function store(array $data){
       return Type_materiel::create($data);
    }

    public function update(array $data,$id){
       return Type_materiel::whereId($id)->update($data);
    }

    public function delete($id){
        Type_materiel::destroy($id);
    }
}
