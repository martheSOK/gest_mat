<?php

namespace Database\Seeders;

use App\Models\Type_materiel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeMaterielSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Type_materiel::create([

            "libelle" => "Ecran samsung"

        ]);


        Type_materiel::create([

            "libelle" => "Ecran LG"

        ]);


        Type_materiel::create([

            "libelle" => "Ecran philips"

        ]);

        Type_materiel::create([

            "libelle" => "Unité centrale HP"

        ]);

    }
}
