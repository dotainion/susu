<?php
namespace src\module\contribution\objects;

use InvalidArgumentException;
use src\infrastructure\IUser;
use src\infrastructure\Payment;

class Contribution extends Payment{
    protected string $contribution;
    protected ?IUser $user=null;

    public function __construct(){
        parent::__construct();
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function user():?IUser{
        return $this->user;
    }

    public function setContribution(string $contribution):void{
        if(empty($contribution) || (int)$contribution <= 0){
            throw new InvalidArgumentException('Contribution is required.');
        }
        $this->contribution = $contribution;
    }

    public function setUser(IUser $user):void{
        $this->user = $user;
    }
}