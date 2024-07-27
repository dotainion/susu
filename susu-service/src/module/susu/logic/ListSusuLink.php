<?php
namespace src\module\susu\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\susu\repository\SusuLinkRepository;

class ListSusuLink{
    protected SusuLinkRepository $repo;

    public function __construct(){
        $this->repo = new SusuLinkRepository();
    }

    public function links(Id $groupId):Collector{
        return $this->repo->listSusuLink([
            'groupId' => $groupId
        ]);
    }
}