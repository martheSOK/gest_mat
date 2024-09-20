<?php

namespace App\Repositories;

use App\Interfaces\LignePretRepositoryInterface;
use App\Models\LignePret;

class LignePretRepository implements LignePretRepositoryInterface
{
    /**
     * Create a new class instance.
     */



        public function index(int $pret_id){
            $ligne_prets = LignePret::where("pret_id" , $pret_id)->get();
            return $ligne_prets;
        }

        public function getById($id){
           return LignePret::findOrFail($id);
        }

        public function store(array $data){
           return LignePret::create($data);
        }

        public function update(array $data, $id)
        {
           // dd($data);
            $lignePret = LignePret::findOrFail($id);
            //dd($lignePret);
            $updated = $lignePret->update($data); // Retourne `true` si la mise à jour réussit

            return $updated ? $lignePret : false;
        }


        public function delete($id){
            LignePret::destroy($id);
        }

}
