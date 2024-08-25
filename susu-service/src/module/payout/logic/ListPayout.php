<?php
namespace src\module\payout\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\payout\repository\PayoutRepository;

class ListPayout{
    protected PayoutRepository $repo;

    public function __construct(){
        $this->repo = new PayoutRepository();
    }

    public function history(Id $susuId, Id $memberId):Collector{
        return $this->repo->listPayout([
            'susuId' => $susuId,
            'memberId' => $memberId
        ]);
    }

    public function bySusuId(Id $susuId):Collector{
        return $this->repo->listPayout([
            'susuId' => $susuId,
        ]);
    }
}