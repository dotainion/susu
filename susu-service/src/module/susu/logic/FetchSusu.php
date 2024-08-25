<?php
namespace src\module\susu\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\susu\repository\SusuRepository;

class FetchSusu{
    protected SusuRepository $repo;

    public function __construct(){
        $this->repo = new SusuRepository();
    }

    public function byId(Id $id):Collector{
        return $this->repo->listSusu([
            'id' => $id
        ]);
    }

    public function byGroupId(Id $id):Collector{
        return $this->repo->listSusu([
            'groupId' => $id
        ]);
    }

    public function activeById(Id $id):Collector{
        return $this->repo->listSusu([
            'id' => $id,
            'completed' => false,
            'canceled' => false
        ]);
    }

    public function activeByGroupId(Id $groupId):Collector{
        return $this->repo->listSusu([
            'groupId' => $groupId,
            'completed' => false,
            'canceled' => false
        ]);
    }
}