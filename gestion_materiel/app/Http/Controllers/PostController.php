<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
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


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->postRepositoryInterface->index();

        return ApiResponseClass::sendResponse(PostResource::collection($data), '', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //

        $details = [

            'salle_id' => $request->salle_id,
            'nom' => $request->nom,
            'etat' => $request->etat,
        ];
        DB::beginTransaction();
        try {
            $post = $this->postRepositoryInterface->store($details);

            DB::commit();
            return ApiResponseClass::sendResponse(new PostResource($post), 'Post Create Successful', 200);
        } catch (\Exception $ex) {
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

        $un_post = $this->postRepositoryInterface->getById($post->id);
        return ApiResponseClass::sendResponse(new PostResource($un_post), '', 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
        $updateDetails = [

            'salle_id' => $request->salle_id,
            'nom' => $request->nom,
            'etat' => $request->etat,
        ];
        DB::beginTransaction();
        try {
            $post = $this->postRepositoryInterface->update($updateDetails, $post->id);
            DB::commit();
            return ApiResponseClass::sendResponse('Post Update Successful', '', 200);
        } catch (\Exception $ex) {
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
            // Vérifie si le post est utilisé dans la table materiels
            $postEstUtilise = DB::table('materiels')
                ->where('post_id', $post->id)
                ->exists();  // Utilise exists() pour vérifier si le poste est référencé dans la table materiels

            if (!$postEstUtilise) {
                // Si aucun matériel ne fait référence à ce post, supprimer le post
                $this->postRepositoryInterface->delete($post->id);
                return ApiResponseClass::sendResponse('Post supprimé avec succès', '', 200);
            }

            // Si des matériels sont référencés à ce post, renvoyer un message d'erreur
            return ApiResponseClass::sendResponse('Erreur : Action non permise.', '', 403);
        }







    public function postsDisponible()
        {

            $postsDisponibles = Post::where('etat', '=' , 'Disponible')->get();

            if ($postsDisponibles->isEmpty()) {
                return response()->json(['message' => 'Aucun poste disponible.'], 404);
            }

            return response()->json($postsDisponibles);
        }





        public function postsPartiellementDisponible(){

            $postsPartielDisponibles = Post::where('etat', '=','Partielement disponible')->get();
            if ($postsPartielDisponibles->isEmpty()) {
                return response()->json(['message' => 'Aucun poste Partielement disponible.'], 404);
            }
            return response()->json($postsPartielDisponibles);

        }


        public function assigneUsers(Request $request, int $post)
        {
            $userActifs = [];
            $data = $request->input("data");
            //dd($data);

            if (!is_array($data)) {
                return ApiResponseClass::sendError("Les données soumises sont incorrectes", 400);
            }

            foreach ($data as $key => $userId) {
                //dd($userId);
                $posteActif = $this->postRepositoryInterface->verifierPosteActif($userId);
                //dd($posteActif);
                if ($posteActif) {
                    array_push($userActifs, $userId);
                    unset($data[$key]);
                }
            }

            $data = array_values($data);
            $message = "";

            DB::beginTransaction();
            try {
                $this->postRepositoryInterface->assigneUsers($data, $post);
                DB::commit();

                if ($userActifs) {
                    $message = count($userActifs) . " user(s) a ou ont déjà un post actif";
                }
                else {
                    $message = "Post assigné avec succès";
                }
                return ApiResponseClass::sendResponse($userActifs, $message, 206);
            }
            catch (\Exception $ex) {
                DB::rollBack();
                Log::error("Erreur lors de l'assignation du post: " . $ex->getMessage());
                return ApiResponseClass::sendError($ex->getMessage(), 400);  // Renvoie le message d'erreur
            }
            //dd($userActifs);
        }





    public function detachUsers(Request $request, int $post)
        {
            $userIds = $request->input('user_ids'); // Récupération des IDs des utilisateurs à détacher

            if (!is_array($userIds)) {
                return ApiResponseClass::sendError("Les données soumises sont incorrectes", 400);
            }

            DB::beginTransaction();

            try {
                // Appel au repository pour détacher les utilisateurs
                $this->postRepositoryInterface->detachUsers($userIds, $post);

                // Compter le nombre d'utilisateurs restants liés à ce poste
                $remainingUsersCount = DB::table('user_posts')
                    ->where('post_id', $post)
                    ->where('utilise', true)
                    ->count();

                // Déterminer l'état du poste
                if ($remainingUsersCount === 0) {
                    // Aucun utilisateur actif
                    $status = 'Disponible';
                }
                else {
                    // Au moins un utilisateur actif
                    $status = 'Partielement disponible';
                }

                // Mettre à jour l'état du poste
                DB::table('posts')
                    ->where('id', $post)
                    ->update(['etat' => $status, 'updated_at' => now()]);

                DB::commit();

                return ApiResponseClass::sendResponse('Utilisateurs détachés avec succès', '', 200);
            }
            catch (\Exception $ex) {
                DB::rollBack();
                Log::error("Erreur lors du détachement des utilisateurs : " . $ex->getMessage());
                return ApiResponseClass::rollback($ex->getMessage());
            }
        }


        public function getUsersByPost($post)
            {
                // Trouver le post par ID avec les utilisateurs associés
                $post = Post::with('users')->find($post);

                // Vérifier si le post existe
                if (!$post) {
                    return response()->json(['message' => 'Post non trouvé'], 404);
                }
                DB::beginTransaction();

                try {
                    // Récupérer les utilisateurs associés au post
                    $users = $post->users;

                    // Retourner la liste des utilisateurs
                    return response()->json($users);
                }
                catch (\Exception $ex) {
                    DB::rollBack();
                    Log::error("Erreur lors de la recuperation des utilisateurs : " . $ex->getMessage());
                    return ApiResponseClass::rollback($ex->getMessage());
                }
            }




            public function getPostsWithoutMateriel($materiel_id)
                {
                    $posts = Post::postsWithoutMateriel($materiel_id);
                    return response()->json($posts);
                }


}
