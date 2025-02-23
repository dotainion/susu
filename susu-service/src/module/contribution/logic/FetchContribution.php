<?php
namespace src\module\contribution\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\contribution\repository\ContributionRepository;

class FetchContribution{
    protected ContributionRepository $repo;

    public function __construct(){
        $this->repo = new ContributionRepository();
    }

    public function contribution(Id $id):Collector{
        return $this->repo->listContribution([
            'id' => $id,
        ]);
    }
}