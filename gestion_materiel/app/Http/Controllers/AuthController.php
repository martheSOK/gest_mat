<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\AuthRepositoryInterface;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //

    private AuthRepositoryInterface $authRepositoryInterface;

    public function __construct(AuthRepositoryInterface $authRepositoryInterface)
    {
        $this->authRepositoryInterface = $authRepositoryInterface;
    }

    public function register(StoreUserRequest $request)
    {
        $fields = [
            'name' =>$request->name,
            'prenom' => $request->prenom,
            'contact' => $request->contact,
            'email' =>$request->email,
            'password'=>  bcrypt($request->password),
        ];

        DB::beginTransaction();
        try{
             $result = $this->authRepositoryInterface->register($fields);
             $user = $result['user']; // Extraire l'utilisateur du tableau
             $token = $result['token']; // Extraire le token

             DB::commit();

             return ApiResponseClass::sendResponse([
                'user' => new UserResource($user), // Inclure la resource de l'utilisateur
                'token' => $token // Inclure le token directement ici
            ],'user Create Successful',201);

        }catch (\Exception $ex) {
            DB::rollBack();

            Log::error("Erreur lors de la creation de user: " . $ex->getMessage());
            return ApiResponseClass::rollback($ex->getMessage());
        }


    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = $this->authRepositoryInterface->login($request->email, $request->password);

            if (!$user) {
                return response()->json([
                    'errors' => [
                        'email' => ['The provided credentials are incorrect.']
                    ]
                ], 401); // 401 Unauthorized
            }

            $token = $user->createToken($user->name);

            return response()->json([
                'user' => $user,
                'token' => $token->plainTextToken,
                'message' => 'vous êtes connecté'
            ]);
        }
        catch (\Exception $ex) {
            // Logger l'erreur pour le débogage
            Log::error("Erreur lors de la tentative de connexion : " . $ex->getMessage());

            return response()->json([
                'message' => 'Une erreur s\'est produite lors de la connexion.'
            ], 500); // 500 Internal Server Error
        }
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'statut' => 'success',
            'message' => 'You are logged out.'
        ]);
    }
}
