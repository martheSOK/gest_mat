<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterielResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' =>$this->id,
            'type_materiel_id' =>$this->type_materiel_id,
            'post_id' =>$this->post_id,
            'salle_id' =>$this->salle_id,
            'etat' =>$this->etat,
            'localisation' => $this->localisation,
            'date_entree' => $this->date_entree,
            'date_sortie' => $this->date_sortie,
            'numero_serie' => $this->numero_serie
        ];

    }
}
