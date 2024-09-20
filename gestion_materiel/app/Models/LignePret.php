<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LignePret extends Model
{
    use HasFactory;

    protected $fillable=[
        'pret_id',
        'materiel_id',
        'quantite_preter',

    ];

    protected $guarded =[
        'id'
    ];


    // protected $casts = [
    //     'materiel_id' => 'nullable', // Permettre que materiel_id soit NULL
    // ];

    public function pret(): BelongsTo
    {
        return $this->belongsTo(Pret::class);
    }
    public function materiel(): BelongsTo
    {
        return $this->belongsTo(Materiel::class);
    }
}
