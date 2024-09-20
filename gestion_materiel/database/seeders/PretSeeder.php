<?php

namespace Database\Seeders;

use App\Models\Pret;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PretSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Pret::create([
            "user_id" => 1,
            "date_pret"  => "10/08/2024",
            //"date_retour_prevu" => "12/09/2024",
            "date_retour" => "01/10/2024",
            "type_pret"  => "emprunt",
            "etat" => "en cours"
        ]);
    }
}
