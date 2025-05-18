<?php
namespace src\module\refund\objects;

use InvalidArgumentException;
use tools\infrastructure\Id;
use src\infrastructure\Payment;

class Refund extends Payment{
    protected string $amount;
    protected Id $contributionId;
    protected string $reason;
    protected string $type;

    public function __construct(){
        parent::__construct();
        $this->contributionId = new Id();
    }

    public function amount():string{
        return $this->amount;
    }

    public function reason():string{
        return $this->reason;
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

    public function setReason(string $reason):void{
        $this->reason = $reason;
    }
}