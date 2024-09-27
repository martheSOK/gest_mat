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
        Schema::create('materiels', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('type_materiel_id');
            $table->integer('post_id')->nullable();
            $table->integer('salle_id')->nullable();
            //$table->enum('etat',EtatMaterielStringEnum::toString());
            $table->enum('etat',["Présent fonctionnel" ,"Présent hors service", "Absent"]);
            $table->enum('localisation',["en magasin","en utilisation" ,"en reparation" ,"en location","don"]);
            $table->datetime('date_entree');
            $table->datetime('date_sortie')->nullable();;
            $table->string('numero_serie');
            $table->timestamps();

            $table->foreign("type_materiel_id")->references("id")->on("type_materiels");
            $table->foreign("salle_id")->references("id")->on("salles");
            $table->foreign("post_id")->references("id")->on("posts");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiels');
    }
};
