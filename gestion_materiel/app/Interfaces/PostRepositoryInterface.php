<?php

namespace App\Interfaces;

use Illuminate\Support\Facades\Request;

Interface PostRepositoryInterface
{
    public function index();
    public function getById($id);
    public function store(array $data);
    public function update(array $data,$id);
    public function delete($id);
    public function assigneUsers(array $data, int $post);
    public function detachUsers(array $userIds, int $postId);
    public function verifierPosteActif(int $userId);
}
