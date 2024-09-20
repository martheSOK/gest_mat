<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreLignePretRequest;
use App\Http\Requests\UpdateLignePretRequest;
use App\Http\Resources\LignePretResource;
use App\Interfaces\LignePretRepositoryInterface;
use App\Models\LignePret;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LignePretController extends Controller
{


    private LignePretRepositoryInterface $lignePretInerface;

    public function __construct(LignePretRepositoryInterface $lignePretRepositoryInterface)
    {
        $this->lignePretInerface = $lignePretRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(int $pret_id)
    {
        //
        $lignePrets = $this->lignePretInerface->index($pret_id);
        return ApiResponseClass::sendResponse(LignePretResource::collection($lignePrets),'',201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLignePretRequest $request, int $pret_id , int $materiel_id)
    {

        // Extraire les données validées depuis le FormRequest
        $validatedData = $request->validated();

        // Ajouter pret_id et materiel_id aux données validées
        $validatedData['pret_id'] = $pret_id;
        $validatedData['materiel_id'] = $materiel_id;

        DB::beginTransaction();
        try {
            $lignePret = $this->lignePretInerface->store($validatedData);
            DB::commit();
            return ApiResponseClass::sendResponse(new LignePretResource($lignePret), 'LignePrêt create Successful' ,200);
        }
        catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la création de la ligne prêt: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LignePret $lignePret)
    {
        //
        $une_ligne = $this->lignePretInerface->getById($lignePret->id);
        return ApiResponseClass::sendResponse(new LignePretResource($une_ligne), '', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLignePretRequest $request, LignePret $lignePret)
    {
        // Extraire les données validées depuis le FormRequest
        $validatedData = $request->validated();
        //dd($validatedData);

        DB::beginTransaction();
        try {
            // Vérifier si la mise à jour a été réussie

            //dd($validatedData);
            $updated = $this->lignePretInerface->update($validatedData, $lignePret->id);

            if ($updated) {
                DB::commit();
                return ApiResponseClass::sendResponse('Ligne de Prêt mise à jour avec succès', '', 200);
            } else {
                // Si la mise à jour n'a pas affecté de ligne
                return ApiResponseClass::sendResponse('Aucune modification apportée à la Ligne de Prêt', '', 304);
            }
        }
        catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la mise à jour de ligne prêt: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LignePret $lignePret)
    {
        //
        $this->lignePretInerface->delete($lignePret->id);
        return ApiResponseClass::sendResponse('Ligne de Prêt Delete Successful','',200);
    }
}
