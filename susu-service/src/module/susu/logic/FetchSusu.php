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

    public function byGroupId(Id $id):Collector{
        return $this->repo->listSusu([
            'groupId' => $id
        ]);
    }

    public function activeByGroupId(Id $id):Collector{
        return $this->repo->listSusu([
            'groupId' => $id,
            'completed' => false
        ]);
    }
}