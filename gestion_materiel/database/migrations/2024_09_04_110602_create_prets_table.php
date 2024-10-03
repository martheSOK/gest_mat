<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prets', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->integer('materiel_id');
            $table->integer('user_id');
            $table->datetime('date_pret');
            //$table->datetime('date_retour_prevu');
            $table->datetime('date_retour');
            $table->enum('type_pret' , ["réparation" , "emprunt"]);
            $table->enum('etat' ,["en cours" , "restitué"]);
            $table->timestamps();


            $table->foreign("user_id")->references("id")->on("users");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prets');
    }
};
