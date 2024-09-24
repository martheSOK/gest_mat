<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreMaterielRequest;
use App\Http\Requests\UpdateMaterielRequest;
use App\Http\Resources\MaterielResource;
use App\Interfaces\MaterielRepositoryInterface;
use App\Models\Materiel;
use App\Models\Post;
use App\Models\Salle;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MaterielController extends Controller
{

    private MaterielRepositoryInterface $materielRepositoryInterface;

    public function __construct(MaterielRepositoryInterface $matRepositoryInterface)
    {
        $this->materielRepositoryInterface = $matRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $materiels=$this->materielRepositoryInterface->index();

        return ApiResponseClass::sendResponse(MaterielResource::collection($materiels),'',200);

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterielRequest $request)
    {
        //

        $details=[

            'type_materiel_id' =>$request->type_materiel_id,
            'post_id' =>$request->post_id,
            'salle_id'=>$request->salle_id,
            'etat' =>$request->etat,
            'localisation' =>$request->localisation,
            'date_entree' =>$request->date_entree,
            'date_sortie' =>$request->date_sortie ,
            'numero_serie' =>$request->numero_serie,


        ];

        DB::beginTransaction();
        try {
            $materiel = $this->materielRepositoryInterface->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new MaterielResource($materiel), 'Matériel Create Successful',201);

        } catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la création du matériel: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Materiel $materiel)
    {
        //
        $un_materiel=$this->materielRepositoryInterface->getById($materiel->id);

        return ApiResponseClass::sendResponse(new MaterielResource($un_materiel),'',200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterielRequest $request, Materiel $materiel)
    {
        //

        $updatedetails=[

            'type_materiel_id' => $request->type_materiel_id,
            'post_id' => $request->post_id,
            'salle_id'=>$request->salle_id,
            'etat' => $request->etat,
            'localisation' => $request->localisation,
            'date_entree' => $request->date_entree,
            'date_sortie' => $request->date_sortie ,
            'numero_serie' => $request->numero_serie,


        ];

        DB::beginTransaction();
        try {
            $this->materielRepositoryInterface->update($updatedetails, $materiel->id);
            DB::commit();
            return ApiResponseClass::sendResponse('Matériel update succès','',201);

        } catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la mise à jour du matériel: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materiel $materiel)
{
    DB::beginTransaction();
    try {
        $this->materielRepositoryInterface->delete($materiel->id);
        DB::commit();
        return ApiResponseClass::sendResponse('Matériel Delete Successful','',200);
    }
    catch(QueryException $ex) {
        DB::rollBack();

        // Vérifier si l'erreur est une violation de clé étrangère
        if ($ex->getCode() == "23503") {
            // Retourne une réponse d'erreur personnalisée
            return ApiResponseClass::sendError(
                'Impossible de supprimer ce matériel car il est encore prêté.',
                400
            );
        }
        Log::error("Erreur lors de la suppression du matériel: " . $ex->getMessage());
        return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
    }
}



    // public function assignToPoste(int $materiel_id, int $post_id)
    //     {
    //         DB::beginTransaction();
    //         try {

    //             $this->materielRepositoryInterface->assigneToPost($post_id, $materiel_id);
    //             DB::commit();
    //             return ApiResponseClass::sendResponse('Matériel assigné avec succès au poste', '', 200);
    //         }
    //         catch (\Exception $ex) {
    //             DB::rollBack();
    //             Log::error("Erreur lors de l'assignation du matériel: " . $ex->getMessage());
    //             return ApiResponseClass::rollback($ex->getMessage());
    //         }
    //     }


    public function assignToPoste(Request $request, int $post_id)
        {
            DB::beginTransaction();
            try {
                // Récupérer la liste des matériels depuis le body de la requête
                $materiels = $request->input('materiels');
                // Tableau pour les matériels déjà assignés
                $materielsDejaAssignes = [];
                // Tableau pour les matériels non valides
                $materielsNonValides = [];

                // Filtrer les matériels pour retirer ceux qui ne remplissent pas les conditions
                foreach ($materiels as $key => $materiel_id) {
                    $materiel = Materiel::findOrFail($materiel_id);

                    // Vérifier si le matériel est déjà associé à un poste
                    if ($materiel->post_id !== null) {
                        // Ajouter ce matériel au tableau des matériels déjà assignés
                        $materielsDejaAssignes[] = $materiel_id;
                        // Retirer ce matériel du tableau des matériels à assigner
                        unset($materiels[$key]);
                        continue; // Passer au matériel suivant
                    }

                    // Vérifier l'état et la localisation
                    if ($materiel->etat !== 'Présent fonctionnel' || $materiel->localisation !== 'en magasin') {
                        // Ajouter ce matériel au tableau des matériels non valides
                        $materielsNonValides[] = $materiel_id;
                        // Retirer ce matériel du tableau des matériels à assigner
                        unset($materiels[$key]);
                        continue; // Passer au matériel suivant
                    }
                }

                // Assigner les matériels restants au poste
                foreach ($materiels as $materiel_id) {
                    $materiel = Materiel::findOrFail($materiel_id);
                    $poste = Post::findOrFail($post_id);

                    // Assigner le matériel au poste
                    $materiel->post()->associate($poste);

                    // Mettre à jour l'état du matériel en "utilisation"
                    $materiel->localisation = 'en utilisation';

                    // Modifier l'ID de la salle du matériel pour qu'il corresponde à celui du poste
                    $materiel->salle_id = $poste->salle_id;
                    $materiel->save();
                }
                DB::commit();

                // Réponse en cas de succès avec des messages appropriés
                $messages = [];
                if (!empty($materielsDejaAssignes)) {
                    $messages[] = 'Certains matériels étaient déjà associés à un poste.';
                }
                if (!empty($materielsNonValides)) {
                    $messages[] = 'Certains matériels n\'étaient pas valides (état ou localisation incorrects).';
                }

                return ApiResponseClass::sendResponse('Matériels traités avec succès.', [
                    'materiels_deja_assignes' => $materielsDejaAssignes,
                    'materiels_non_valides' => $materielsNonValides,
                ], 200);
            }
            catch (\Exception $ex) {
                DB::rollBack();
                Log::error("Erreur lors de l'assignation des matériels: " . $ex->getMessage());
                return ApiResponseClass::rollback($ex->getMessage());
            }
        }





        public function detachMaterielsFromPost(Request $request)
            {
                DB::beginTransaction();
                try {
                    // Récupérer les IDs des matériels depuis le body de la requête
                    $materielIds = $request->input('materiels'); // Tableau d'IDs de matériels

                    // Récupérer l'ID de la salle avec la nomination "magasin"
                    $salleMagasin = Salle::where('nomination', 'magasin')->firstOrFail();
                    $salleMagasinId = $salleMagasin->id;

                    $this->materielRepositoryInterface->detachMaterielsFromPost($materielIds, $salleMagasinId);

                    DB::commit();

                    // Retourner une réponse de succès
                    return ApiResponseClass::sendResponse('Matériels détachés du poste avec succès.', '', 200);
                }
                catch (\Exception $ex) {
                    DB::rollBack();
                    Log::error("Erreur lors du détachement des matériels: " . $ex->getMessage());
                    return ApiResponseClass::rollback($ex->getMessage());
                }
            }



            public function AssignMaterials()
            {
                try {
                    $materiels = Materiel::where('etat', 'Présent fonctionnel')
                                         ->where('localisation', 'en magasin')
                                         ->get();

                    // Vérifier si des matériels ont été trouvés
                    if ($materiels->isEmpty()) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Aucun matériel trouvé avec l\'état "Présent fonctionnel" et la localisation "en magasin".'
                        ], 404);
                    }

                    // Retourner les matériels trouvés
                    return response()->json([
                        'status' => 'success',
                        'materiels' => $materiels
                    ], 200);
                }
                catch (\Exception $ex) {
                    // En cas d'erreur, retourner un message d'erreur
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Une erreur s\'est produite lors de la récupération des matériels.',
                        'details' => $ex->getMessage()
                    ], 500);
                }
            }







}


