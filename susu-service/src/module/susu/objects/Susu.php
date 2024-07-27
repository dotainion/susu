<?php
namespace src\module\susu\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Susu implements IObjects{
    protected Id $id;
    protected string $contribution;
    protected string $cycle;
    protected DateHelper $payoutDate;
    protected DateHelper $startDate;
    protected Id $groupId;
    protected bool $pendingStart;
    protected bool $completed;

    public function __construct(){
        $this->id = new Id();
        $this->groupId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function pendingStart():bool{
        return $this->pendingStart;
    }

    public function completed():bool{
        return $this->completed;
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function cycle():string{
        return $this->cycle;
    }

    public function payoutDate():DateHelper{
        return $this->payoutDate;
    }

    public function startDate():DateHelper{
        return $this->startDate;
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setCompleted(bool $completed):void{
        $this->completed = $completed;
    }

    public function setContribution(string $contribution):void{
        $this->contribution = $contribution;
    }

    public function setCycle(string $cycle):void{
        $this->cycle = $cycle;
    }
    
    public function setPayoutDate(string $payoutDate):void{
        $this->payoutDate = new DateHelper($payoutDate);
    }
    
    public function setStartDate(string $startDate):void{
        $this->startDate = new DateHelper($startDate);
    }

    public function setPendingStart(bool $pendingStart):void{
        $this->pendingStart = $pendingStart;
    }

    public function setGroupId(string $groupId):void{
        $this->groupId->set($groupId);
    }
}