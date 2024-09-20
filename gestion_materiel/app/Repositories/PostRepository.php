<?php

namespace App\Repositories;

use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use App\Models\UserPost;
use Illuminate\Support\Facades\DB;

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
            ->where('user_id', $userId)
            ->where('utilise', true)
            ->first();
    }



    public function assigneUsers(int $userId, int $postId)
{
    // Parcourir les utilisateurs soumis

        // Vérifiez si l'utilisateur est déjà assigné à ce poste
        $userPost = DB::table('user_posts')
            ->where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        if ($userPost) {
            // Si l'utilisateur est déjà assigné mais avec utilise = false, on met à jour la colonne 'utilise' à true
            if (!$userPost->utilise) {
                DB::table('user_posts')
                    ->where('post_id', $postId)
                    ->where('user_id', $userId)
                    ->update(['utilise' => true, 'updated_at' => now()]);
            }
        }
         else {
            // Si l'utilisateur n'est pas encore assigné, on l'attache avec 'utilise' à true
            DB::table('user_posts')->insert([
                'post_id' => $postId,
                'user_id' => $userId,
                'utilise' => true, // Définit 'utilise' à true pour indiquer que l'utilisateur utilise le poste
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

}

public function detachUsers(array $userIds, int $postId)
{
    // Boucle sur chaque ID utilisateur pour détacher de ce poste
    foreach ($userIds as $userId) {
        // Mise à jour de l'entrée pour définir 'utilise' à false
        DB::table('user_posts')
            ->where('post_id', $postId)
            ->where('user_id', $userId)
            ->update(['utilise' => false, 'updated_at' => now()]);
    }
}




}
