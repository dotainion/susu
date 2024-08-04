<?php
namespace src\module\contribution\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\contribution\repository\ContributionRepository;

class ListContribution{
    protected ContributionRepository $repo;

    public function __construct(){
        $this->repo = new ContributionRepository();
    }

    public function history(Id $susuId, Id $memberId):Collector{
        return $this->repo->listHistory([
            'susuId' => $susuId,
            'memberId' => $memberId,
            'hide' => false
        ]);
    }
}