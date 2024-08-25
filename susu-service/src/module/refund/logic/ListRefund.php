<?php
namespace src\module\refund\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\refund\repository\RefundRepository;

class ListRefund{
    protected RefundRepository $repo;

    public function __construct(){
        $this->repo = new RefundRepository();
    }

    public function history(Id $susuId, Id $memberId):Collector{
        return $this->repo->listRefund([
            'susuId' => $susuId,
            'memberId' => $memberId
        ]);
    }

    public function bySusuId(Id $susuId):Collector{
        return $this->repo->listRefund([
            'susuId' => $susuId,
        ]);
    }
}