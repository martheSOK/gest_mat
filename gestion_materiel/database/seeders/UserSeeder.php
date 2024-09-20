<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
            User::create([

                "name" => "KOUMAÎ",
                "prenom" => "Sani",
                "contact" => "91784598",
                "email" => "koumaï@gmail.com",
                "password" => "12345678"
            ]);

            User::create([

                "name" => "TEOURI",
                "prenom" => "Sabirou",
                "contact" => "92542441",
                "email" => "admin@gmail.com",
                "password" => "12345678"
            ]);

    }
}
