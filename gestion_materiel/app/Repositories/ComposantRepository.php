<?php

namespace App\Repositories;

use App\Interfaces\ComposantRepositoryInterface;
use App\Models\Composant;

class ComposantRepository implements ComposantRepositoryInterface
{

        public function index(){
            return Composant::all();
        }

        public function getById($id){
           return Composant::findOrFail($id);
        }

        public function store(array $data){
           return Composant::create($data);
        }

        public function update(array $data,$id){
           return Composant::whereId($id)->update($data);
        }

        public function delete($id){
            Composant::destroy($id);
        }

}
