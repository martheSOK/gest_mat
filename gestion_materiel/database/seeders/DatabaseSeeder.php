<?php

namespace Database\Seeders;

use App\Models\Composant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        $this->call(SalleSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(TypeMaterielSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(MaterielSeeder::class);
        $this->call(ComposantSeeder::class);
        $this->call(PretSeeder::class);
    }
}
