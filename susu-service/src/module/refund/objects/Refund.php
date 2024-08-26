<?php
namespace src\module\refund\objects;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Payment;

class Refund extends Payment{
    protected string $amount;
    protected Id $contributionId;

    public function __construct(){
        parent::__construct();
        $this->contributionId = new Id();
    }

    public function amount():string{
        return $this->amount;
    }

    public function contributionId():Id{
        return $this->contributionId;
    }

    public function setAmount(string $amount):void{
        if(empty($amount) || (int)$amount <= 0){
            throw new InvalidArgumentException('Amount is required.');
        }
        $this->amount = $amount;
    }

    public function setContributionId(string $contributionId):void{
        $this->contributionId->set($contributionId);
    }
}