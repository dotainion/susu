<?php
namespace src\module\payout\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\payout\repository\PayoutRepository;

class FetchPayout{
    protected PayoutRepository $repo;

    public function __construct(){
        $this->repo = new PayoutRepository();
    }

    public function amount(Id $id):Collector{
        return $this->repo->listPayout([
            'id' => $id,
        ]);
    }
}