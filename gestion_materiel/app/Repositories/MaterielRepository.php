<?php

namespace App\Repositories;

use App\Interfaces\MaterielRepositoryInterface;
use App\Models\Materiel;
use App\Models\Post;
use Illuminate\Http\Request;

class MaterielRepository implements MaterielRepositoryInterface
{

    // Exemple d'une méthode dans un contrôleur pour récupérer les matériels


    public function index(){
        $materiels = Materiel::with('type_materiel')->get();
        return $materiels;
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

        // Vérifier si le matériel est déjà associé à un poste
        if ($materiel->post_id !== null) {
            // Si le matériel est déjà assigné à un poste, on renvoie une erreur
            throw new \Exception("Le matériel avec l'ID {$materiel_id} est déjà assigné à un autre poste.");
        }

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




    public function detachMaterielsFromPost(array $materiel_ids, int $salleMagasinId, string $etat, string $localisation)
{
    // Récupérer tous les matériels à détacher
    $materiels = Materiel::whereIn('id', $materiel_ids)->get();

    // Valider l'état et la localisation
    $etatsValides = ['Présent fonctionnel', 'Présent hors service', 'Absent'];
    $localisationsValides = ['en magasin', 'en utilisation', 'en reparation', 'en location', 'don'];

    if (!in_array($etat, $etatsValides) || !in_array($localisation, $localisationsValides)) {
        throw new \InvalidArgumentException("L'état ou la localisation fournis ne sont pas valides.");
    }

    foreach ($materiels as $materiel) {
        // Vérifier si le matériel est déjà associé à un poste
        if ($materiel->post_id !== null) {
            // Détacher le matériel du poste
            $materiel->post()->dissociate();

            // Mettre à jour la localisation et l'état selon les arguments fournis
            $materiel->localisation = $localisation;
            $materiel->etat = $etat;

            // Changer l'ID de la salle en celui de la salle "magasin"
            $materiel->salle_id = $salleMagasinId;

            // Enregistrer les modifications
            $materiel->save();
        }
    }
}

}
