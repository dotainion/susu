<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\repository\GroupRepository;

class ListGroupLinks{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function groupLinks(Id $groupId):Collector{
        return $this->repo->listJoinGroup([
            'groupId' => $groupId
        ]);
    }

    public function groupLinksByIdArray(Array $groupIdArray):Collector{
        return $this->repo->listJoinGroup([
            'groupId' => $groupIdArray
        ]);
    }
}