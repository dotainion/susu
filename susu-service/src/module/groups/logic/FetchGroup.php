<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\repository\GroupRepository;

class FetchGroup{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function group(Id $id):Collector{
        return $this->repo->listGroups([
            'id' => $id
        ]);
    }
}