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



    public function assigneToPost(int $materiel_id, int $post_id)
    {
        // Récupérer le matériel par son ID
        $materiel = Materiel::findOrFail($materiel_id);

        // Vérifier si le matériel est déjà associé à un poste
        if ($materiel->post_id !== null) {
            throw new \Exception("Le matériel avec l'ID {$materiel_id} est déjà assigné à un autre poste.");
        }

        // Vérifier si le poste existe
        $poste = Post::findOrFail($post_id);

        // Assigner le matériel au poste
        $materiel->post()->associate($poste);

        // Mettre à jour l'état du matériel en "utilisation"
        $materiel->localisation = 'en utilisation';

        // Modifier l'ID de la salle du matériel pour qu'il corresponde à celui du poste
        $materiel->salle_id = $poste->salle_id;

        // Sauvegarder les changements
        $materiel->save();
    }





//     public function detachMaterielsFromPost(array $materiel_ids, int $salleMagasinId, string $etat, string $localisation)
// {
//     // Récupérer tous les matériels à détacher
//     $materiels = Materiel::whereIn('id', $materiel_ids)->get();

//     // Valider l'état et la localisation
//     $etatsValides = ['Présent fonctionnel', 'Présent hors service', 'Absent'];
//     $localisationsValides = ['en magasin', 'en utilisation', 'en reparation', 'en location', 'don'];

//     if (!in_array($etat, $etatsValides) || !in_array($localisation, $localisationsValides)) {
//         throw new \InvalidArgumentException("L'état ou la localisation fournis ne sont pas valides.");
//     }

//     foreach ($materiels as $materiel) {
//         // Vérifier si le matériel est déjà associé à un poste
//         if ($materiel->post_id !== null) {
//             // Détacher le matériel du poste
//             $materiel->post()->dissociate();

//             // Mettre à jour la localisation et l'état selon les arguments fournis
//             $materiel->localisation = $localisation;
//             $materiel->etat = $etat;

//             // Changer l'ID de la salle en celui de la salle "magasin"
//             $materiel->salle_id = $salleMagasinId;

//             // Enregistrer les modifications
//             $materiel->save();
//         }
//     }
// }



        public function detachMaterielsFromPost(int $materiel_id, int $post_id, string $etat, string $localisation)
        {
            // Récupérer le matériel par son ID
            $materiel = Materiel::findOrFail($materiel_id);

            // Vérifier si le matériel est actuellement associé au poste spécifié
            if ($materiel->post_id === $post_id) {
                // Détacher le matériel du poste
                $materiel->post()->dissociate();

                // Mettre à jour l'état et la localisation selon les arguments fournis
                $materiel->localisation = $localisation;
                $materiel->etat = $etat;

                // Changer l'ID de la salle pour celui du magasin
                //$materiel->salle_id = $salleMagasinId;

                // Enregistrer les modifications
                $materiel->save();
            }
            else {
                // Si le matériel n'est pas associé au poste spécifié, lever une exception
                throw new \Exception("Le matériel avec l'ID {$materiel_id} n'est pas associé au poste spécifié.");
            }
        }

}
