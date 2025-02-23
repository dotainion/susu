<?php
namespace src\module\susu\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\susu\repository\SusuLinkRepository;

class ListSusuLink{
    protected SusuLinkRepository $repo;

    public function __construct(){
        $this->repo = new SusuLinkRepository();
    }

    public function links(Id $susuId):Collector{
        return $this->repo->listSusuLink([
            'susuId' => $susuId
        ]);
    }
}