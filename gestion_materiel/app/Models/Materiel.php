<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Materiel extends Model
{
    use HasFactory;
    protected $fillable=[
        'type_materiel_id',
        'post_id',
        'etat',
        'localisation',
        'date_entree',
        'date_sortie',
        'numero_serie',
    ];

    protected $guarded =[
        'id'
    ];

    public function type_materiel(): BelongsTo
    {
        return $this->belongsTo(Type_materiel::class);
    }

    public function composants(): HasMany
    {
        return $this->hasMany(Composant::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(post::class);
    }


    public function ligne_prets() :HasMany
    {
        return $this->hasmany(LignePret::class);
    }


    protected function casts(): array
    {
        return [
            'date_entree' => 'datetime',
            'date_sortie' => 'datetime',

        ];
    }
}
