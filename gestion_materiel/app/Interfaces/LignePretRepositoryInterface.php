<?php

namespace App\Interfaces;

interface LignePretRepositoryInterface
{
    //
    public function index(int $id);
    public function getById($id);
    public function store(array $data);
    public function update(array $data,$id);
    public function delete($id);
}
