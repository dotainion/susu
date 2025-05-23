<?php
namespace src\module\messages\objects;

use InvalidArgumentException;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;
use src\module\user\objects\User;

class Message implements IObjects{
    protected Id $id;
    protected Id $fromId;
    protected Id $toId;
    protected DateHelper $date;
    protected string $message;
    protected bool $read;
    protected bool $hide;
    protected ?User $user=null;
    protected ?bool $fromCommunity=false;

    public function __construct(){
        $this->id = new Id();
        $this->fromId = new Id();
        $this->toId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function fromId():IId{
        return $this->fromId;
    }

    public function toId():IId{
        return $this->toId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function message():string{
        return $this->message;
    }

    public function read():bool{
        return $this->read;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function user():?User{
        return $this->user;
    }

    public function fromCommunity():bool{
        return $this->fromCommunity;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setFromId(string $fromId):void{
        $this->fromId->set($fromId);
    }

    public function setToId(string $toId):void{
        $this->toId->set($toId);
    }
    
    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }

    public function setMessage(string $message):void{
        if(strlen($message) > 4000){
            throw new InvalidArgumentException('Message should not exceed 4000 charactors.');
        }
        $this->message = $message;
    }

    public function setRead(bool $read):void{
        $this->read = $read;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setUser(User $user):void{
        $this->user = $user;
    }

    public function setFromCommunity(bool $fromCommunity):void{
        $this->fromCommunity = $fromCommunity;
    }
}