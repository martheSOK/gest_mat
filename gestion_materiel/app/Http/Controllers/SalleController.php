<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreSalleRequest;
use App\Http\Requests\UpdateSalleRequest;
use App\Http\Resources\SalleResource;
use App\Interfaces\SalleRepositoryInterface;
use App\Models\Salle;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class SalleController extends Controller
{

    private SalleRepositoryInterface $salleRepositoryInterface;

    public function __construct(SalleRepositoryInterface $salleRepositoryInterface)
    {
        $this->salleRepositoryInterface = $salleRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data= $this->salleRepositoryInterface->index();
        return ApiResponseClass::sendResponse(SalleResource::collection($data),'',200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalleRequest $request)
    {
        //
        $details =[
            'nomination' => $request->nomination,
            'nombre_post' => $request->nombre_post
        ];
        DB::beginTransaction();
        try{
             $salle = $this->salleRepositoryInterface->store($details);

             DB::commit();
             return ApiResponseClass::sendResponse(new SalleResource($salle),'salle Create Successful',201);

        }
        catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la création de la salle: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Salle $salle)
    {
        //
        $une_salle = $this->salleRepositoryInterface->getById($salle->id);
        return ApiResponseClass::sendResponse(new SalleResource($une_salle),'',200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalleRequest $request, Salle $salle)
    {
        //

        $updateDetails =[
            'nomination' => $request->nomination,
            'nombre_post' => $request->nombre_post
        ];
        DB::beginTransaction();
        try{
             $salle = $this->salleRepositoryInterface->update($updateDetails,$salle->id);

             DB::commit();
             return ApiResponseClass::sendResponse('salle Update Successful','',201);

        }catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la mise à jour de la salle: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salle $salle)
    {
        //
        $this->salleRepositoryInterface->delete($salle->id);

        return ApiResponseClass::sendResponse('Salle Delete Successful','',200);

    }
}
