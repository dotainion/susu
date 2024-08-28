<?php
namespace src\module\contribution\objects;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Payment;

class Contribution extends Payment{
    protected string $contribution;
    protected Id $scheduleId;

    public function __construct(){
        parent::__construct();
        $this->scheduleId = new Id();
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function scheduleId():?Id{
        return $this->scheduleId;
    }

    public function setScheduleId(string $scheduleId):void{
        $this->scheduleId->set($scheduleId);
    }

    public function setContribution(string $contribution):void{
        if(empty($contribution) || (int)$contribution <= 0){
            throw new InvalidArgumentException('Contribution is required.');
        }
        $this->contribution = $contribution;
    }
}