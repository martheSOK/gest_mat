<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface MaterielRepositoryInterface
{
    public function index();
    public function getById($id);
    public function store(array $data);
    public function update(array $data,$id);
    public function delete($id);
    public function assigneToPost(int $post_id, int $materiel_id);
}
