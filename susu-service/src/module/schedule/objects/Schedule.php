<?php
namespace src\module\schedule\objects;

use src\infrastructure\Collector;
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
    protected int $accurance;
    protected Id $susuId;
    protected ?Id $memberId=null;
    protected Collector $payouts;
    protected Collector $refunds;
    protected Collector $contributions;

    public function __construct(){
        $this->id = new Id();
        $this->susuId = new Id();
        $this->payouts = new Collector();
        $this->refunds = new Collector();
        $this->contributions = new Collector();
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

    public function accurance():int{
        return $this->accurance;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function user():?User{
        return $this->user;
    }

    public function payouts():Collector{
        return $this->payouts;
    }

    public function refunds():Collector{
        return $this->refunds;
    }

    public function contributions():Collector{
        return $this->contributions;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setPosition(int $position):void{
        $this->position = $position;
    }

    public function setAccurance(int $accurance):void{
        $this->accurance = $accurance;
    }
    
    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }

    public function setMemberId(?string $memberId):void{
        if($memberId === null || $memberId === Id::Default){
            return;
        }
        $this->memberId = new Id($memberId);
    }

    public function setSusuId(string $susuId):void{
        $this->susuId->set($susuId);
    }

    public function setUser(User $user):void{
        $this->user = $user;
    }

    public function setPayouts(Collector $payouts):void{
        $this->payouts = $payouts;
    }

    public function setRefunds(Collector $refunds):void{
        $this->refunds = $refunds;
    }

    public function setContributions(Collector $contributions):void{
        $this->contributions = $contributions;
    }
}