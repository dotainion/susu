<?php
namespace src\module\contribution\logic;

use src\module\contribution\objects\Contribution;
use src\module\contribution\repository\ContributionRepository;

class AddContribution{
    protected ContributionRepository $repo;

    public function __construct(){
        $this->repo = new ContributionRepository();
    }

    public function add(Contribution $contribution):void{
        $this->repo->create($contribution);
    }
}