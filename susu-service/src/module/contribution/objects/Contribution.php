<?php
namespace src\module\contribution\objects;

use InvalidArgumentException;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Contribution implements IObjects{
    protected Id $id;
    protected Id $susuId;
    protected Id $memberId;
    protected DateHelper $date;
    protected string $contribution;
    protected string $description;
    protected bool $paid;
    protected bool $refunded;
    protected bool $payout;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->susuId = new Id();
        $this->memberId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function paid():bool{
        return $this->paid;
    }

    public function refunded():bool{
        return $this->refunded;
    }

    public function payout():bool{
        return $this->payout;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function susuId():IId{
        return $this->susuId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function description():string{
        return $this->description;
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

    public function setSusuId(string $susuId):void{
        $this->susuId->set($susuId);
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

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setPaid(bool $paid):void{
        $this->paid = $paid;
    }

    public function setRefunded(bool $refunded):void{
        $this->refunded = $refunded;
    }

    public function setPayout(bool $payout):void{
        $this->payout = $payout;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}