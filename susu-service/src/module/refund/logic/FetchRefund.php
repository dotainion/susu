<?php
namespace src\module\refund\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\refund\repository\RefundRepository;

class FetchRefund{
    protected RefundRepository $repo;

    public function __construct(){
        $this->repo = new RefundRepository();
    }

    public function refund(Id $id):Collector{
        return $this->repo->listRefund([
            'id' => $id,
        ]);
    }
}