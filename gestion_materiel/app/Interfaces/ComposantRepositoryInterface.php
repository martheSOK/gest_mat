<?php

namespace App\Interfaces;

interface ComposantRepositoryInterface
{
    //

    public function index();
    public function getById($id);
    public function store(array $data);
    public function update(array $data,$id);
    public function delete($id);
}
