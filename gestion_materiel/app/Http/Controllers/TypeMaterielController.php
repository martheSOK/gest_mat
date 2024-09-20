<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreType_materielRequest;
use App\Http\Requests\UpdateType_materielRequest;
use App\Http\Resources\Type_materielResource;
use App\Interfaces\Type_materielRepositoryInterface;
use App\Models\Type_materiel;
use Illuminate\Support\Facades\DB;
class TypeMaterielController extends Controller
{
    private Type_materielRepositoryInterface $type_materielRepositoryInterface;

    public function __construct(Type_materielRepositoryInterface $type_materielRepositoryInterface)
    {
        $this->type_materielRepositoryInterface = $type_materielRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    //    $type= Type_materiel::all();

    //    return $type;

       $data = $this->type_materielRepositoryInterface->index();

        return ApiResponseClass::sendResponse(Type_materielResource::collection($data),'',200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreType_materielRequest $request)
    {
        //

        $details =[
            'libelle' => $request->libelle,

        ];
        DB::beginTransaction();
        try{
             $type_materiel = $this->type_materielRepositoryInterface->store($details);

             DB::commit();
             return ApiResponseClass::sendResponse(new Type_materielResource($type_materiel),'material type Create Successful',201);

        }catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(Type_materiel $type_materiel)
    // {
    //     //

    //     $un_type_materiel = $this->type_materielRepositoryInterface->getById($type_materiel->id);

    //     return ApiResponseClass::sendResponse(new Type_materielResource($un_type_materiel),'',200);
    // }

    public function show(Type_materiel $type_materiel)
    {
        // Récupérer l'instance par son ID
        $un_type_materiel = $this->type_materielRepositoryInterface->getById($type_materiel->id);

        // Vérifier si l'instance existe
        if ($un_type_materiel) {
            // Retourner la ressource si elle existe
            return ApiResponseClass::sendResponse(new Type_materielResource($un_type_materiel), '', 200);
        }

        return ApiResponseClass::sendResponse(null, 'Type de matériel non trouvé ou supprimé.', 404);
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateType_materielRequest $request, Type_materiel $type_materiel)
    {
        //

        $updateDetails =[
            'libelle' => $request->libelle,

        ];
        DB::beginTransaction();
        try{
             $un_type_materiel = $this->type_materielRepositoryInterface->update($updateDetails,$type_materiel->id);

             DB::commit();
             return ApiResponseClass::sendResponse('material type Update Successful','',201);

        }catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type_materiel $type_materiel)
    {
        //

        $this->type_materielRepositoryInterface->delete($type_materiel->id);

        return ApiResponseClass::sendResponse('material type Delete Successful','',204);
    }
}
