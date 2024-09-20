<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type_materiel extends Model
{
    use HasFactory;

    protected $fillable=[
        'libelle',
    ];

    protected $guarded =[
        'id'
    ];





    public function materiels(): HasMany
    {
        return $this->hasMany(Materiel::class);
    }

}
