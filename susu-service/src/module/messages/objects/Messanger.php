<?php
namespace src\module\messages\objects;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\security\SecurityManager;

class Messanger implements IObjects{
    protected Id $id;
    protected Collector $messages;
    protected IObjects $user;
    protected ?DateHelper $latestDate = null;
    protected string $latestMessage = '';
    protected string $quantity = '';

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function messages():Collector{
        return $this->messages;
    }

    public function latestDate():?DateHelper{
        return $this->latestDate;
    }

    public function latestMessage():string{
        return $this->latestMessage;
    }

    public function quantity():string{
        return $this->quantity;
    }

    public function user():IObjects{
        return $this->user;
    }

    public function setMessages(Collector $messages):void{
        $manager = new SecurityManager();
        $recipMessages = array_filter($messages->list(), fn($msg)=>!$msg->toId()->toString() === $manager->user()->id()->toString());
        $unSeenMsgs = array_filter($recipMessages, fn($msg)=>!$msg->read());
        $this->messages = $messages;
        if(!$messages->hasItem()){
            return;
        }
        $msg = $messages->first();
        $this->quantity = (count($unSeenMsgs) >= 100) ? '99+' : ((string)count($unSeenMsgs));
        $this->latestMessage = $msg->message();
        $this->latestDate = $msg->date();
    }

    public function setUser(IObjects $user):void{
        $this->user = $user;
        $this->id->set($user->id()->toString());
    }
}