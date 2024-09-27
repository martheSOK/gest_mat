<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Post::create([
            "salle_id" => 1,
            "nom" => "Post 101",
            "etat" => "Disponible"

        ]);

        Post::create([
            "salle_id" => 1,
            "nom" => "Post 102",
            "etat" => "Disponible"
        ]);

        Post::create([
            "salle_id" => 2,
            "nom" => "Post 101",
            "etat" => "Disponible"
        ]);
    }
}
