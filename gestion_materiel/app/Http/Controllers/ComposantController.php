<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreComposantRequest;
use App\Http\Requests\UpdateComposantRequest;
use App\Http\Resources\ComposantResource;
use App\Interfaces\ComposantRepositoryInterface;
use App\Models\Composant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ComposantController extends Controller
{
    private ComposantRepositoryInterface $composantRepositoryInterface;

    public function __construct(ComposantRepositoryInterface $compoRepositoryInterface){
        $this->composantRepositoryInterface = $compoRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        // $composants = Composant::all();
        // return $composants;

        $composants=$this->composantRepositoryInterface->index();
        return $composants;



    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComposantRequest $request)
    {
        //

        $details =[
            'materiel_id' => $request->materiel_id,
            'designation' => $request->designation,
        ];
        DB::beginTransaction();
        try {
            $composant = $this->composantRepositoryInterface->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new ComposantResource($composant),'Composant Create Successful',200);

        } catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la création du composant: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Composant $composant)
    {
        //
        $un_composant = $this->composantRepositoryInterface->getById($composant->id);
        return ApiResponseClass::sendResponse(new ComposantResource($un_composant),'',201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComposantRequest $request, Composant $composant)
    {
        //
        $updatedetails =[
            'materiel_id' => $request->materiel_id,
            'designation' => $request->designation,
        ];
        DB::beginTransaction();
        try {
            $composant = $this->composantRepositoryInterface->update($updatedetails,$composant->id);
            DB::commit();
            return ApiResponseClass::sendResponse('Composant update Successful','', 200);

        } catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la mise à jours du composant: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Composant $composant)
    {
        // Vérifier si le composant est associé à un matériel
        if ($composant->materiel()->exists()) {
            return ApiResponseClass::sendError('Action nom permise.', 400);
        }

        // Si aucun matériel n'est associé, procéder à la suppression
        $this->composantRepositoryInterface->delete($composant->id);
        return ApiResponseClass::sendResponse('Composant supprimé avec succès.', '', 200);
    }

}
