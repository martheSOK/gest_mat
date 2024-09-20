<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreMaterielRequest;
use App\Http\Requests\UpdateMaterielRequest;
use App\Http\Resources\MaterielResource;
use App\Interfaces\MaterielRepositoryInterface;
use App\Models\Materiel;
use App\Models\Post;
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
        DB::rollBack();  // Annuler la transaction en cas d'erreur

        // Vérifier si l'erreur est une violation de clé étrangère
        if ($ex->getCode() == "23503") {
            // Retourne une réponse d'erreur personnalisée
            return ApiResponseClass::sendError(
                'Impossible de supprimer ce matériel car il est encore prêté.',
                400
            );
        }

        // Log l'erreur pour mieux comprendre la cause
        Log::error("Erreur lors de la suppression du matériel: " . $ex->getMessage());

        // Retourne la réponse d'erreur générique
        return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
    }
}


    public function assignToPoste(int $materiel_id, int $post_id)
    {

        DB::beginTransaction();
        try {

            // Appel au repository pour assigner le matériel au poste
            $this->materielRepositoryInterface->assigneToPost($post_id, $materiel_id);
            // Valider la transaction
            DB::commit();

            // Réponse en cas de succès
            return ApiResponseClass::sendResponse('Matériel assigné avec succès au poste', '', 200);
        }
        catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de l'assignation du matériel: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }



}

