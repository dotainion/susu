<?php
namespace src\module\messages\objects;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\module\groups\objects\Group;
use src\module\user\objects\User;

class Messanger implements IObjects{
    protected Id $id;
    protected Collector $messages;
    protected User|Group $user;
    protected DateHelper $latestDate;
    protected string $latestMessage;
    protected string $quantity;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function messages():Collector{
        return $this->messages;
    }

    public function latestDate():DateHelper{
        return $this->latestDate;
    }

    public function latestMessage():string{
        return $this->latestMessage;
    }

    public function quantity():string{
        return $this->quantity;
    }

    public function user():User|Group{
        return $this->user;
    }

    public function setMessages(Collector $messages):void{
        $unSeenMsgs = array_map(fn($msg)=>!$msg->read(), $messages->list());
        $msg = $messages->first();
        $this->messages = $messages;
        $this->quantity = (count($unSeenMsgs) >= 100) ? '99+' : ((string)count($unSeenMsgs));
        $this->latestMessage = $msg->message();
        $this->latestDate = $msg->date();
    }

    public function setUser(User|Group $user):void{
        $this->user = $user;
        $this->id->set($user->id()->toString());
    }
}