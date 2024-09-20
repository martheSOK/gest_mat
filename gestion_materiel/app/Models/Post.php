<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable=[
        'salle_id',
        'nom',

    ];

    protected $guarded =[
        'id'
    ];

    public function salle(): BelongsTo
    {
        return $this->belongsTo(Salle::class);
    }

    public function materiels(): HasMany
    {
        return $this->hasMany(Materiel::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class ,'user_posts');
    }
}
