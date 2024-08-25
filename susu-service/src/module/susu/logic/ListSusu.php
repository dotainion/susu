<?php
namespace src\module\susu\logic;

use src\infrastructure\Collector;
use src\module\susu\repository\SusuRepository;

class ListSusu{
    protected SusuRepository $repo;

    public function __construct(){
        $this->repo = new SusuRepository();
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listSusu([
            'id' => $idArray
        ]);
    }

    public function activeByGroupIdArray(array $groupIdArray):Collector{
        return $this->repo->listSusu([
            'groupId' => $groupIdArray,
            'completed' => false,
            'canceled' => false
        ]);
    }
}