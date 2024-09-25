<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StorePretRequest;
use App\Http\Requests\UpdatePretRequest;
use App\Http\Resources\PretResource;
use App\Interfaces\PretRepositoryInterface;
use App\Models\LignePret;
use App\Models\Materiel;
use App\Models\Pret;
use Illuminate\Cache\ApcStore;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PretController extends Controller
{

    private PretRepositoryInterface $pretRepositoryInterface;
    public function __construct(PretRepositoryInterface $pretRepositoryInterface){
        $this->pretRepositoryInterface = $pretRepositoryInterface;
     }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $prets=Pret::all();

        // return $prets ;
        $liste_prets = $this->pretRepositoryInterface->index();
        return ApiResponseClass::sendResponse( PretResource::collection($liste_prets),'',200);

    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(StorePretRequest $request)
     {
         // Récupérer les détails du prêt
         $details = [
             'user_id' => $request->user_id,
             'date_pret' => $request->date_pret,
             'date_retour' => $request->date_retour,
             'type_pret' => $request->type_pret,
             'etat' => $request->etat,
         ];

         DB::beginTransaction();

         try {
             // Créer le prêt
             $pret = Pret::create($details);

             // Ajouter les lignes de prêt et mettre à jour l'état et localisation des matériels
             foreach ($request->ligne_prets as $ligne) {
                 $materiel = Materiel::find($ligne['materiel_id']);

                 // Vérifier que le matériel est prêt à être prêté
                 if ($materiel->etat == 'Présent fonctionnel' && $materiel->localisation == 'en magasin') {

                     // Mise à jour des champs selon le type de prêt
                     if ($request->type_pret == 'emprunt') {
                         $materiel->etat = 'Absent';
                         $materiel->localisation = 'en location';
                         $materiel->salle_id = null;
                     } elseif ($request->type_pret == 'réparation') {
                         $materiel->etat = 'Absent';
                         $materiel->localisation = 'en reparation';
                         $materiel->salle_id = null;
                     }

                     // Sauvegarder les modifications sur le matériel
                     $materiel->save();

                     // Créer la ligne de prêt
                     LignePret::create([
                         'pret_id' => $pret->id,
                         'materiel_id' => $ligne['materiel_id'],
                         'quantite_preter' => $ligne['quantite_preter'],
                     ]);
                 } else {
                     throw new \Exception("Le matériel {$materiel->id} n'est pas prêtable.");
                 }
             }

             DB::commit();
             return ApiResponseClass::sendResponse(new PretResource($pret), 'Prêt créé avec succès', 200);
         } catch (\Exception $ex) {
             DB::rollBack();
             Log::error("Erreur lors de la création du prêt: " . $ex->getMessage());
             return ApiResponseClass::rollback($ex->getMessage());
         }
     }

    /**
     * Display the specified resource.
     */
    public function show(Pret $pret)
    {
        //

        $un_pret = $this->pretRepositoryInterface->getById($pret->id);
        return ApiResponseClass::sendResponse(new PretResource($un_pret),'',201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePretRequest $request, Pret $pret)
{
    // Récupérer les détails du prêt à mettre à jour
    $updatedetails = [
        'user_id' => $request->user_id,
        'date_pret' => $request->date_pret,
        'date_retour' => $request->date_retour,
        'type_pret' => $request->type_pret,
        'etat' => $request->etat,
    ];

    DB::beginTransaction();

    try {
        // Mettre à jour les informations du prêt
        $pret->update($updatedetails);

        // Parcourir les lignes de prêt
        $existingLignePretIds = $pret->ligne_prets->pluck('id')->toArray();// on extraire les valeurs du champ id(pluck()) de chaque ligne de prêt associée à ce prêt et on converti la collection retourner en tableau (toArray())
        $newLignePretIds = [];

        foreach ($request->ligne_prets as $ligne) {
            if (isset($ligne['id'])) {
                // Mettre à jour une ligne de prêt existante
                $lignePret = LignePret::find($ligne['id']);
                if ($lignePret) {
                    $materiel = Materiel::find($lignePret['materiel_id']);
                    if ($materiel->etat == 'Présent fonctionnel' && $materiel->localisation == 'en magasin') {
                        // Ensuite, créer la ligne de prêt
                        $lignePret->update([
                            'materiel_id' => $ligne['materiel_id'],
                            'quantite_preter' => $ligne['quantite_preter'],
                        ]);
                        $newLignePretIds[] = $lignePret->id;
                    }
                    else {
                        throw new \Exception("Le matériel {$materiel->id} n'est pas prêtable.");
                    }

                }
            }
             else {

                // Ajouter une nouvelle ligne de prêt
                //avant d'ajouter la nouvele ligne je verifie si le materiel de cette ligne est prêtable
                $materiel = Materiel::find($ligne['materiel_id']);
                if ($materiel->etat == 'Présent fonctionnel' && $materiel->localisation == 'en magasin') {
                    // Ensuite, créer la ligne de prêt
                    $newLignePret = LignePret::create([
                        'pret_id' => $pret->id,
                        'materiel_id' => $ligne['materiel_id'],
                        'quantite_preter' => $ligne['quantite_preter'],
                    ]);
                    $newLignePretIds[] = $newLignePret->id;
                }
                else {
                    throw new \Exception("Le matériel {$materiel->id} n'est pas prêtable.");
                }

            }
        }

        // Supprimer les lignes de prêt qui ne sont plus présentes
        //La fonction array_diff() compare deux tableaux et retourne les éléments qui sont dans le premier tableau mais pas dans le second.
        $lignesToDelete = array_diff($existingLignePretIds, $newLignePretIds);
        LignePret::destroy($lignesToDelete);

        DB::commit();

        return ApiResponseClass::sendResponse(new PretResource($pret), 'Prêt mis à jour avec succès', 200);

    } catch (\Exception $ex) {
        DB::rollBack();

        Log::error("Erreur lors de la mise à jour du prêt: " . $ex->getMessage());
        return ApiResponseClass::rollback($ex->getMessage());
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pret $pret)
    {
        //
        DB::beginTransaction();
        try {

            $this->pretRepositoryInterface->delete($pret->id);

            return ApiResponseClass::sendResponse('Prêt Delete Successful','',200);
        }
        catch(QueryException$ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur
            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la suppression du prêt: " . $ex->getMessage());

            // Retourne la réponse d'erreur générique
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }

    }
}
