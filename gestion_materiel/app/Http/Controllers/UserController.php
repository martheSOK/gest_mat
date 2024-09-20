<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller{

    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function index(){
       $users = $this->userRepositoryInterface->index();

    return ApiResponseClass::sendResponse(UserResource::collection($users),'',200);

    }
    public function store(StoreUserRequest $request){
        $details = [
            'name' =>$request->name,
            'prenom' => $request->prenom,
            'contact' => $request->contact,
            'email' =>$request->email,
            'password'=> $request->password,
            //'post_id' => $request->post_id

        ];
        DB::beginTransaction();
        try{
             $user = $this->userRepositoryInterface->store($details);

             DB::commit();
             return ApiResponseClass::sendResponse(new UserResource($user),'user Create Successful',201);

        }catch (\Exception $ex) {
            DB::rollBack();

            Log::error("Erreur lors de la creation de user: " . $ex->getMessage());
            return ApiResponseClass::rollback($ex->getMessage());
        }
    }




    public function show(User $user){
        // Récupérer l'instance par son ID
        $un_user = $this->userRepositoryInterface->getById($user->id);

        // Vérifier si l'instance existe
        if ($un_user) {
            // Retourner la ressource si elle existe
            return ApiResponseClass::sendResponse(new UserResource($un_user), '', 200);
        }

        return ApiResponseClass::sendResponse(null, 'user non trouvé ou supprimé.', 404);
    }

    public function update(UpdateUserRequest $request , User $user){
        $updateDetails = [
            'name' =>$request->name,
            'prenom' => $request->prenom,
            'contact' => $request->contact,
            'email' =>$request->email,
            'password'=> $request->password,
            //'post_id' => $request->post_id
        ];

        DB::beginTransaction();
         try{
             $user = $this->userRepositoryInterface->update($updateDetails,$user->id);

             DB::commit();
             //dd($user);
             return ApiResponseClass::sendResponse(new UserResource($user),'user registered Successfuly',201);

        }catch (\Exception $ex) {
            DB::rollBack();

            Log::error("Erreur lors de la creation de user: " . $ex->getMessage());
            return ApiResponseClass::rollback($ex->getMessage());
        }
    }

    public function destroy(User $user){
        DB::beginTransaction();
    try {
        $this->userRepositoryInterface->delete($user->id);
        DB::commit();
        return ApiResponseClass::sendResponse('user Delete Successful','',200);
    }
    catch(QueryException $ex) {
        DB::rollBack();  // Annuler la transaction en cas d'erreur

        // Vérifier si l'erreur est une violation de clé étrangère
        if ($ex->getCode() == "23503") {
            // Retourne une réponse d'erreur personnalisée
            return ApiResponseClass::sendError(
                'Impossible de supprimer ce user car il a effectué un prêt.',
                400
            );
        }

        // Log l'erreur pour mieux comprendre la cause
        Log::error("Erreur lors de la suppression du user: " . $ex->getMessage());

        // Retourne la réponse d'erreur générique
        return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
    }
}




}
