<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource2 extends JsonResource
{
     /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'name' =>$this->name,
            'prenom' => $this->prenom,
            'contact' => $this->contact,
            'email' =>$this->email,
            "post_id" =>$this->post_id,
           // Ajouter le token si disponible dans la resource
           'token' => $this->when(isset($this->token), $this->token),
        ];
    }
}
