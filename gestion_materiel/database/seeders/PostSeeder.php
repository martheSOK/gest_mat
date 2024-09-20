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
            "nom" => "Post 101"
        ]);

        Post::create([
            "salle_id" => 1,
            "nom" => "Post 102"
        ]);

        Post::create([
            "salle_id" => 5,
            "nom" => "Post 101"
        ]);
    }
}
