<?php
namespace src\module\history\objects;

use InvalidArgumentException;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class History implements IObjects{
    protected Id $id;
    protected Id $memberId;
    protected DateHelper $date;
    protected string $contribution;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->memberId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }
    
    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }

    public function setContribution(string $contribution):void{
        if(empty($contribution) || (int)$contribution <= 0){
            throw new InvalidArgumentException('Contribution is required.');
        }
        $this->contribution = $contribution;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}