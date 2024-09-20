<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    private PostRepositoryInterface $postRepositoryInterface;

    public function __construct(PostRepositoryInterface $postRepositoryInterface)
    {
        $this->postRepositoryInterface = $postRepositoryInterface;
    }

    //private PostRepositoryInterface $postRepositoryInterface;

    // public function __construct(PostRepositoryInterface $postRepositoryInterface)
    // {
    //     $this->postRepositoryInterface = $postRepositoryInterface;
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $posts=Post::all();
        // return $posts ;


        $data = $this->postRepositoryInterface->index();

        return ApiResponseClass::sendResponse(PostResource::collection($data),'',200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //

        $details =[

            'salle_id' => $request->salle_id,
            'nom' => $request->nom
        ];
        DB::beginTransaction();
        try{
             $post = $this->postRepositoryInterface->store($details);

             DB::commit();
             return ApiResponseClass::sendResponse(new PostResource($post),'Post Create Successful',200);

        }catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la création du post: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //

        $un_post=$this->postRepositoryInterface->getById($post->id);
        return ApiResponseClass::sendResponse(new PostResource($un_post),'',201);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
        $updateDetails=[

            'salle_id' => $request->salle_id,
            'nom' => $request->nom
        ];
        DB::beginTransaction();
        try{
            $post=$this->postRepositoryInterface->update($updateDetails,$post->id);
            DB::commit();
             return ApiResponseClass::sendResponse('Post Update Successful','',200);
        }
        catch(\Exception $ex) {
            DB::rollBack();  // Annuler la transaction en cas d'erreur

            // Log l'erreur pour mieux comprendre la cause
            Log::error("Erreur lors de la mise à jour du post: " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
        $this->postRepositoryInterface->delete($post->id);

        return ApiResponseClass::sendResponse('Post Delete Successful','',200);
    }



    // public function assigneUsers(Request $request, int $id){
    //     //dd($request->all());
    //     //Recuperation de la liste des user soumis
    //     $data = $request->input("data");
    //     //dd($data);
    //     DB::beginTransaction();
    //     try{
    //         $this->postRepositoryInterface->assigneUsers($data , $id);
    //         DB::commit();
    //         return ApiResponseClass::sendResponse('Post asseigne Successful','',206);
    //      }
    //      catch(\Exception $ex) {
    //         DB::rollBack();  // Annuler la transaction en cas d'erreur

    //         // Log l'erreur pour mieux comprendre la cause
    //         Log::error("Erreur lors de l'assignation du post: " . $ex->getMessage());

    //         // Retourne la réponse d'erreur
    //         return ApiResponseClass::rollback($ex->getMessage());  // Utilise le message de l'exception
    //     }
    // }

    public function avalabeAssigneUsers(array $data, int $postId){
        // Parcourir les utilisateurs soumis
        foreach ($data as $userId) {


            // Vérifier si l'utilisateur a déjà un poste actif
            $posteActif = $this->postRepositoryInterface->verifierPosteActif($userId);
            if ($posteActif != null) {
                //dd($posteActif->utilise);
                // return response()->json([
                //     'message' => "L'utilisateur $userId a déjà un poste actif.", //Souhaitez-vous désactiver l'ancien poste ?,
                //     'user_id' => $userId,
                //     'post_id_actif' => $posteActif->post_id,]
                // );
                //printf("L\'utilisateur $userId a déjà un poste actif.");
                //return ApiResponseClass::sendResponse("L\'utilisateur $userId a déjà un poste actif.", '', 206);
                return "L\'utilisateur $userId a déjà un poste actif.";
            }
            else{

                    $this->postRepositoryInterface->assigneUsers($userId, $postId);
                    DB::commit();

                    return ApiResponseClass::sendResponse('Post assigné avec succès', '', 206);

            }
        }

    }


    public function assigneUsers(Request $request, int $id) {
        // Récupération de la liste des utilisateurs soumis
        $data = $request->input("data");
        $newUsersCount = count($data);

        // Début de la transaction
        DB::beginTransaction();

        try {
            // Vérifier combien d'utilisateurs sont déjà actifs sur ce poste
            $activeUsersCount = DB::table('user_posts')
                ->where('post_id', $id)
                ->where('utilise', true)
                ->count();

            // Calculer combien d'utilisateurs peuvent encore être assignés (max 2)
            $availableSlots = 2 - $activeUsersCount;

            // Si aucun utilisateur ne peut être ajouté
            if ($availableSlots <= 0) {
                return ApiResponseClass::sendError("Le poste est déjà occupé par 2 utilisateurs.", 400);
            }

            // Si plus d'utilisateurs sont soumis que le nombre de places disponibles
            if ($newUsersCount > $availableSlots) {
                return ApiResponseClass::sendError("Il n'y a que $availableSlots place(s) disponible(s) pour ce poste.", 400);
            }

            // Assigner les utilisateurs

           $this->avalabeAssigneUsers($data, $id);

            // Validation de la transaction

        } catch (\Exception $ex) {
            // Annuler la transaction en cas d'erreur
            DB::rollBack();

            // Log l'erreur pour analyse
            Log::error("Erreur lors de l'assignation du poste : " . $ex->getMessage());

            // Retourne la réponse d'erreur
            return ApiResponseClass::rollback($ex->getMessage());
        }
    }



    public function detachUsers(Request $request, int $postId)
{
    $userIds = $request->input('user_ids'); // Récupération des IDs des utilisateurs à détacher

    DB::beginTransaction();

    try {
        // Appel au repository pour détacher les utilisateurs
        $this->postRepositoryInterface->detachUsers($userIds, $postId);

        DB::commit();

        return ApiResponseClass::sendResponse('Utilisateurs détachés avec succès', '', 200);
    }
    catch (\Exception $ex) {
        DB::rollBack();
        Log::error("Erreur lors du détachement des utilisateurs : " . $ex->getMessage());
        return ApiResponseClass::rollback($ex->getMessage());
    }
}


}

