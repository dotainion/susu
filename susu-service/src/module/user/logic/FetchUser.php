<?php
namespace src\module\user\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Email;
use tools\infrastructure\Id;
use src\module\user\repository\UserRepository;

class FetchUser{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function user(Id $id):Collector{
        return $this->repo->listUsers(['id' => $id, 'hide' => false]);
    }

    public function userByForeignId(string $id):Collector{
        return $this->repo->listUsers(['foreignId' => $id, 'hide' => false]);
    }

    public function userByEmail(Email $email):Collector{
        return $this->repo->listUsers(['email' => $email, 'hide' => false]);
    }
}