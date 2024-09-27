<?php

namespace Database\Seeders;

use App\Models\Materiel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterielSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Materiel::create([
            "type_materiel_id" =>2,
            "post_id" => 1,
            "salle_id" => 5,
            "etat" => "Présent fonctionnel" ,
            "localisation" =>"en magasin",
            "date_entree" => "12/08/2023",
            "date_sortie"  => "12/08/2025",
            "numero_serie" => "azer456sdf"

        ]);


        Materiel::create([
            "type_materiel_id" =>4,
            "post_id" => 1,
            "salle_id" => 1,
            "etat" => "Présent fonctionnel" ,
            "localisation" =>"en utilisation",
            "date_entree" => "12/08/2024",
            "date_sortie"  => "12/08/2025",
            "numero_serie" => "vvvvazer456sdf"

        ]);
    }
}
