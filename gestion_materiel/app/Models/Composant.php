<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Composant extends Model
{
    use HasFactory;

    protected $fillable=[
        'materiel_id',
        'designation',
        //'numero_serie',

    ];

    protected $guarded =[
        'id'
    ];






    public function materiel(): BelongsTo
    {
        return $this->belongsTo(Materiel::class);
    }
}
