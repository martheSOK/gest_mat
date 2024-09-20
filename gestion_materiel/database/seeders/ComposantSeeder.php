<?php

namespace Database\Seeders;

use App\Models\Composant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComposantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Composant::create([
            "materiel_id" => 2,
            "designation" => "carte mère 1"
        ]);
        Composant::create([
            "materiel_id" => 2,
            "designation" => "Ram 4GO"
        ]);
    }
}
