<?php

namespace App\Repositories;

use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use App\Models\UserPost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostRepository implements PostRepositoryInterface
{
    public function index(){
        $posts=Post::all();
        return $posts;
    }
    public function getById($id){
        $un_post=Post::findOrFail($id);
        return $un_post;

    }
    public function store(array $data){
        return Post::create($data);

    }

    public function update(array $data,$id){
        return Post::whereId($id)->update($data);
    }
    public function delete($id){
        Post::destroy($id);
    }

    //vérifier si un utilisateur a déjà un post actif ou pas
    public function verifierPosteActif(int $userId)
    {
        // Vérifie si l'utilisateur a déjà un poste actif
        return DB::table('user_posts')
            ->where('user_id', '=', $userId)
            ->where('utilise', '=', true)
            ->first();
    }



    public function assigneUsers($data, $post)
    {
        // Vérifier combien d'utilisateurs sont déjà assignés à ce poste avec utilise = true
        $activeUsersCount = DB::table('user_posts')
            ->where('post_id', $post)
            ->where('utilise', true)
            ->count();
        //dd($activeUsersCount);
         // Ajout du log pour vérifier le nombre d'utilisateurs actifs avant l'assignation
        Log::info('Nombre d\'utilisateurs actifs avant l\'assignation : ' . $activeUsersCount);


        // Si le poste est déjà occupé par deux utilisateurs, renvoyer un message d'erreur
        if ($activeUsersCount >= 2) {
            throw new \Exception("Le poste est déjà occupé par deux utilisateurs.");
        }

        // Parcourir les utilisateurs soumis
        foreach ($data as $userId) {
            // Vérifiez si l'utilisateur est déjà assigné à ce poste
            $userPost = DB::table('user_posts')
                ->where('post_id', $post)
                ->where('user_id', $userId)
                ->first();

            if ($userPost) {
                // Si l'utilisateur est déjà assigné mais avec utilise = false, on met à jour la colonne 'utilise' à true
                if (!$userPost->utilise) {
                    DB::table('user_posts')
                        ->where('post_id', $post)
                        ->where('user_id', $userId)
                        ->update(['utilise' => true, 'updated_at' => now()]);
                }
            } else {
                // Si l'utilisateur n'est pas encore assigné, on l'attache avec 'utilise' à true
                DB::table('user_posts')->insert([
                    'post_id' => $post,
                    'user_id' => $userId,
                    'utilise' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Mettre à jour le nombre d'utilisateurs actifs
            $activeUsersCount++;
            //dd($activeUsersCount);
            // Si on dépasse 2 utilisateurs actifs, arrêter l'assignation et renvoyer un message
            if ($activeUsersCount >2) {
                throw new \Exception("Le poste ne peut pas être assigné à plus de deux utilisateurs.");
            }
        }

        // Mettre à jour l'état du poste en fonction du nombre d'utilisateurs actifs
        if ($activeUsersCount === 2) {
            // Si 2 utilisateurs sont assignés, marquer le poste comme "Occupé"
            DB::table('posts')->where('id', $post)->update(['etat' => 'Occupe']);
        }
        elseif ($activeUsersCount === 1) {
            // Si 1 utilisateur est assigné, marquer le poste comme "Partiellement disponible"
            DB::table('posts')->where('id', $post)->update(['etat' => 'Partielement disponible']);
        }
        else {
            // Si aucun utilisateur n'est assigné, remettre l'état à "Disponible"
            DB::table('posts')->where('id', $post)->update(['etat' => 'Disponible']);
        }
        //dd($activeUsersCount);
    }

public function detachUsers(array $userIds, int $post)
{
    // Boucle sur chaque ID utilisateur pour détacher de ce poste
    foreach ($userIds as $userId) {
        // Mise à jour de l'entrée pour définir 'utilise' à false
        DB::table('user_posts')
            ->where('post_id', $post)
            ->where('user_id', $userId)
            ->update(['utilise' => false, 'updated_at' => now()]);
    }
}




}
