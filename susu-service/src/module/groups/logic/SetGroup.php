<?php
namespace src\module\groups\logic;

use src\module\groups\objects\Group;
use src\module\groups\repository\GroupRepository;

class SetGroup{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function set(Group $group):void{
        $collector = $this->repo->listGroups([
            'id' => $group->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($group);
            return;
        }
        $this->repo->create($group);
    }
}