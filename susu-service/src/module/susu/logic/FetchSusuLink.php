<?php
namespace src\module\susu\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\susu\repository\SusuLinkRepository;

class FetchSusuLink{
    protected SusuLinkRepository $repo;

    public function __construct(){
        $this->repo = new SusuLinkRepository();
    }

    public function link(Id $susuId, Id $memberId):Collector{
        return $this->repo->listSusuLink([
            'susuId' => $susuId,
            'memberId' => $memberId
        ]);
    }

    public function linkByIdArray(array $susuIdArray, array $memberIdArray):Collector{
        return $this->repo->listSusuLink([
            'susuId' => $susuIdArray,
            'memberId' => $memberIdArray
        ]);
    }
}