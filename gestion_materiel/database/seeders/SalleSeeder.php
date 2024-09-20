<?php

namespace Database\Seeders;

use App\Models\Salle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Salle::create([
            "nomination" => "L1",
            "nombre_post" => 24
        ]);

        Salle::create([
            "nomination" => "L2",
            "nombre_post" => 12
        ]);

        Salle::create([
            "nomination" => "L3",
            "nombre_post" => 11
        ]);

        Salle::create([
            "nomination" => "L4",
            "nombre_post" => 2
        ]);

        Salle::create([
            "nomination" => "salle enseignant",
            "nombre_post" => 4
        ]);
    }
}
