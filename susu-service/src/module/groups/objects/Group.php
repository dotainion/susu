<?php
namespace src\module\communities\objects;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\IUser;
use src\module\susu\objects\Susu;

class Community implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $description;
    protected ?DateHelper $createdDate = null;
    protected ?Collector $members = null;
    protected Id $creatorId;
    protected ?IUser $owner = null;
    protected ?Susu $susu = null;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->creatorId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function owner():?IUser{
        return $this->owner;
    }

    public function susu():?Susu{
        return $this->susu;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function description():string{
        return $this->description;
    }

    public function createdDate():?DateHelper{
        return $this->createdDate;
    }

    public function members():?Collector{
        return $this->members;
    }

    public function creatorId():IId{
        return $this->creatorId;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setOwner(IUser $owner):void{
        $this->owner = $owner;
    }

    public function setSusu(Susu $susu):void{
        $this->susu = $susu;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }
    
    public function setCreatedDate(string $createdDate):void{
        $this->createdDate = new DateHelper($createdDate);
    }

    public function setCreatorId(string $creatorId):void{
        $this->creatorId->set($creatorId);
    }

    public function setMembers(Collector $members):void{
        $this->members = $members;
    }
}