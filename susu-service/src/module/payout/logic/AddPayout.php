<?php
namespace src\module\payout\logic;

use src\module\payout\objects\Payout;
use src\module\payout\repository\PayoutRepository;

class AddPayout{
    protected PayoutRepository $repo;

    public function __construct(){
        $this->repo = new PayoutRepository();
    }

    public function add(Payout $payout):void{
        $this->repo->create($payout);
    }
}