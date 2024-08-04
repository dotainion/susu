<?php
namespace src\module\groups\logic;

use src\module\groups\objects\GroupLink;
use src\module\groups\repository\GroupRepository;

class JoinGroup{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function join(GroupLink $link):void{
        $collector = $this->repo->listJoinGroup([
            'groupId' => $link->groupId(),
            'memberId' => $link->memberId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->joinGroup($link);
    }
}