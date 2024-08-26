<?php
namespace src\infrastructure;

class Payment implements IObjects{
    protected Id $id;
    protected Id $susuId;
    protected Id $memberId;
    protected DateHelper $date;
    protected ?IUser $user=null;
    protected string $description;

    public function __construct(){
        $this->id = new Id();
        $this->susuId = new Id();
        $this->memberId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function user():?IUser{
        return $this->user;
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

    public function description():string{
        return $this->description;
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

    public function setUser(IUser $user):void{
        $this->user = $user;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }
}