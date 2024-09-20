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
        Schema::create('ligne_prets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('pret_id');
            $table->integer('materiel_id');
            $table->integer('quantite_preter');
            $table->timestamps();

            $table->foreign("pret_id")->references("id")->on("prets")->onDelete('cascade');
            $table->foreign("materiel_id")->references("id")->on("materiels");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_prets');
    }
};
