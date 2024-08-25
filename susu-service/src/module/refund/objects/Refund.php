<?php
namespace src\module\refund\objects;

use InvalidArgumentException;
use src\infrastructure\IUser;
use src\infrastructure\Payment;

class Refund extends Payment{
    protected string $amount;
    protected ?IUser $user=null;

    public function __construct(){
        parent::__construct();
    }

    public function amount():string{
        return $this->amount;
    }

    public function user():?IUser{
        return $this->user;
    }

    public function setAmount(string $amount):void{
        if(empty($amount) || (int)$amount <= 0){
            throw new InvalidArgumentException('Amount is required.');
        }
        $this->amount = $amount;
    }

    public function setUser(IUser $user):void{
        $this->user = $user;
    }
}