<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\repository\GroupRepository;

class ListGroups{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function groups():Collector{
        return $this->repo->listGroups();
    }

    public function memberGroups(Id $memberId):Collector{
        return $this->repo->listGroups([
            'memberId' => $memberId
        ]);
    }

    public function ownerGroups(Id $creatorId):Collector{
        return $this->repo->listGroups([
            'creatorId' => $creatorId
        ]);
    }
}