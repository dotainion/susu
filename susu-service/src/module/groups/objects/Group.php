<?php
namespace src\module\groups\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Group implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $contribution;
    protected string $description;
    protected string $cycle;
    protected ?DateHelper $payoutDate = null;
    protected ?DateHelper $createdDate = null;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function description():string{
        return $this->description;
    }

    public function cycle():string{
        return $this->cycle;
    }

    public function payoutDate():?DateHelper{
        return $this->payoutDate;
    }

    public function createdDate():?DateHelper{
        return $this->createdDate;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setContribution(string $contribution):void{
        $this->contribution = $contribution;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setCycle(string $cycle):void{
        $this->cycle = $cycle;
    }
    
    public function setPayoutDate(string $payoutDate):void{
        $this->payoutDate = new DateHelper($payoutDate);
    }
    
    public function setCreatedDate(string $createdDate):void{
        $this->createdDate = new DateHelper($createdDate);
    }
}