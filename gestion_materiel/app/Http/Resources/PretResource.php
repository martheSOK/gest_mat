<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PretResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[

        'id' => $this->id,
        'user_id' => $this->user_id,
        'date_pret'  => $this->date_pret,
        //'date_retour_prevu' => $this->date_retour_prevu,
        'date_retour'  => $this->date_retour,
        'type_pret'  => $this->type_pret,
        'etat' => $this->etat,
        'created_at' => $this->created_at,

        // Inclure les lignes de prêt
        'ligne_prets' => LignePretResource::collection($this->whenLoaded('ligne_prets')) // Utilisation d'une ressource pour les lignes de prêt

        ];
    }
}
