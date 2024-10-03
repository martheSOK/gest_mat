<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LignePretResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pret_id' => $this->pret_id ,
            'materiel_id' => $this->materiel_id,
            'quantite_preter' => $this->quantite_preter ,
            'created_at' => $this->created_at

        ];
    }
}
