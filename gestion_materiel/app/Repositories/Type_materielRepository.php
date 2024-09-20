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

    // public function getById($id)
    // {
    //     // Récupérer le type de matériel
    //     $type_materiel = Type_materiel::find($id);

    //     // Vérifier si le type existe
    //     if ($type_materiel) {
    //         return $type_materiel;
    //     } else {
    //         // Lancer une exception avec un message personnalisé si le type n'existe pas
    //         throw new \Exception("Le type de matériel avec l'ID {$id} n'existe pas.");
    //     }
    // }



    // public function getById($id)
    // {
    //     try {
    //         // Récupération du type matériel ou levée d'exception si non trouvé
    //         return Type_materiel::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         // Personnaliser le message d'erreur
    //         throw new \Exception("Le type de matériel avec l'ID {$id} n'existe pas.");
    //     }
    // }
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
