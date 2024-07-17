<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\repository\GroupRepository;

class JoinGroup{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function join(Id $groupId, Id $memberId):void{
        $collector = $this->repo->listJoinGroup($groupId, $memberId);
        if($collector->hasItem()){
            return;
        }
        $this->repo->joinGroup($groupId, $memberId);
    }
}