<?php
namespace src\module\payout\objects;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Payment;

class Payout extends Payment{
    protected string $amount;
    protected Id $scheduleId;

    public function __construct(){
        parent::__construct();
    }

    public function amount():string{
        return $this->amount;
    }

    public function scheduleId():Id{
        return $this->scheduleId;
    }

    public function setScheduleId(int $scheduleId):void{
        $this->scheduleId = $scheduleId;
    }

    public function setAmount(string $amount):void{
        if(empty($amount) || (int)$amount <= 0){
            throw new InvalidArgumentException('Amount is required.');
        }
        $this->amount = $amount;
    }
}