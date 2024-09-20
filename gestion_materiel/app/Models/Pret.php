<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pret extends Model
{
    use HasFactory;

    protected $fillable=[
        'user_id',
        'date_pret',
        //'date_retour_prevu',
        'date_retour',
        'type_pret',
        'etat',

    ];

    protected $guarded =[
        'id'
    ];

    // public function materiel() : BelongsTo
    // {
    //     return $this->belongsTo(Materiel::class);
    // }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function ligne_prets() : HasMany {

        return $this->hasmany(LignePret::class);

    }

    protected function casts(): array
    {
        return [
            'date_pret' => 'datetime',
            //'date_retour_prevu' => 'datetime',
            'date_retour_effective' => 'datetime',

        ];
    }
}
