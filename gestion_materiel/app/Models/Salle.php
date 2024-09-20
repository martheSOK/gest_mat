<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Salle extends Model
{
    use HasFactory;

    protected $fillable=[
        'nomination',
        'nombre_post',

    ];

    protected $guarded =[
        'id'
    ];


    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
