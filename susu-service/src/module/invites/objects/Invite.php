<?php
namespace src\module\invites\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\module\communities\objects\Community;

class Invite implements IObjects{
    protected IId $id;
    protected IId $memberId;
    protected IId $targetId;
    protected DateHelper $date;
    protected DateHelper $expire;
    protected ?Community $community;
    protected bool $isSusu;

    public function __construct(){
        $this->id = new Id();
        $this->memberId = new Id();
        $this->targetId = new Id();
        $this->date = new DateHelper();
        $this->expire = new DateHelper();
    }

    public function id():IId{
        return $this->id;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function targetId():IId{
        return $this->targetId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function expire():DateHelper{
        return $this->expire;
    }

    public function community():?Community{
        return $this->community;
    }

    public function isSusu():bool{
        return $this->isSusu;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }

    public function setTargetId(string $targetId):void{
        $this->targetId->set($targetId);
    }

    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setExpire(string $expire):void{
        $this->expire->set($expire);
    }

    public function setCommunity(Community $community):void{
        $this->community = $community;
    }

    public function setIsSusu(bool $isSusu):void{
        $this->isSusu = $isSusu;
    }
}