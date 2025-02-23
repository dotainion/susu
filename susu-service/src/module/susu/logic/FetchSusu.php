<?php
namespace src\module\susu\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
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

    public function byCommunityId(Id $id):Collector{
        return $this->repo->listSusu([
            'communityId' => $id
        ]);
    }

    public function activeById(Id $id):Collector{
        return $this->repo->listSusu([
            'id' => $id,
            'completed' => false,
            'canceled' => false
        ]);
    }

    public function activeByCommunityId(Id $communityId):Collector{
        return $this->repo->listSusu([
            'communityId' => $communityId,
            'completed' => false,
            'canceled' => false
        ]);
    }
}