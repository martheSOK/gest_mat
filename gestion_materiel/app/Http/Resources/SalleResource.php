<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalleResource extends JsonResource
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
            'nomination' => $this->nomination,
            'nombre_post'=>$this->nombre_post,
            'created_at' => $this->created_at

        ];
    }
}
