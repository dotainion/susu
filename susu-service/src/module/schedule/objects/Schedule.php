<?php
namespace src\module\schedule\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\module\user\objects\User;

class Schedule implements IObjects{
    protected Id $id;
    protected DateHelper $date;
    protected ?User $user=null;
    protected int $position;
    protected Id $susuId;
    protected ?Id $memberId=null;

    public function __construct(){
        $this->id = new Id();
        $this->susuId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function memberId():?IId{
        return $this->memberId;
    }

    public function susuId():IId{
        return $this->susuId;
    }

    public function position():int{
        return $this->position;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function user():?User{
        return $this->user;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setPosition(int $position):void{
        $this->position = $position;
    }
    
    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }

    public function setMemberId(string $memberId):void{
        $this->memberId = new Id($memberId);
    }

    public function setSusuId(string $susuId):void{
        $this->susuId->set($susuId);
    }

    public function setUser(User $user):void{
        $this->user = $user;
    }
}