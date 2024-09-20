<?php

namespace App\Repositories;

use App\Interfaces\MaterielRepositoryInterface;
use App\Models\Materiel;
use App\Models\Post;
use Illuminate\Http\Request;

class MaterielRepository implements MaterielRepositoryInterface
{
    public function index(){
        return Materiel::all();
    }

    public function getById($id){
       return Materiel::findOrFail($id);
    }

    public function store(array $data){
       return Materiel::create($data);
    }

    public function update(array $data,$id){
       return Materiel::whereId($id)->update($data);
    }

    public function delete($id){
        Materiel::destroy($id);
    }



    public function assigneToPost(int $post_id, int $materiel_id)
    {

        // Récupération du matériel
        $materiel = Materiel::findOrFail($materiel_id);

        // Vérifier si le poste existe
        $poste = Post::find($post_id);

        if ($poste != null) {

            // Assigner le matériel au poste
            $materiel->post()->associate($poste);
            $materiel->save();
        } else {

            // Lancer une exception si le poste n'existe pas
            throw new \Exception("Le poste avec l'ID {$post_id} n'existe pas.");
        }
    }
}
