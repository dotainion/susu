<?php
namespace src\module\refund\logic;

use src\module\refund\objects\Refund;
use src\module\refund\repository\RefundRepository;

class AddRefund{
    protected RefundRepository $repo;

    public function __construct(){
        $this->repo = new RefundRepository();
    }

    public function add(Refund $refund):void{
        $this->repo->create($refund);
    }
}