<?php
namespace src\module\user\logic;

use src\infrastructure\Collector;
use src\module\user\repository\UserRepository;

class ListUsers{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function users():Collector{
        return $this->repo->listUsers([
            'hide' => false
        ]);
    }

    public function usersByIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listUsers([
            'id' => $idArray,
            'hide' => false
        ]);
    }
}