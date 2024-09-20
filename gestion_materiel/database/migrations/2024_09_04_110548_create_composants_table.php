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
        Schema::create('composants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('materiel_id');
            $table->string('designation');
            //$table->string('numero_serie');
            $table->timestamps();

            $table->foreign("materiel_id")->references("id")->on("materiels");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composants');
    }
};
