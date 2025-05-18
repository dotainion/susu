<?php
namespace src\module\messages\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\messages\factory\MessageFactory;
use src\module\messages\objects\Message;

class MessageRepository extends Repository{
    protected MessageFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new MessageFactory();
    }
    
    public function create(Message $message):void{
        $this->insert('message')        
            ->column('id', $this->uuid($message->id()))
            ->column('fromId', $this->uuid($message->fromId()))  
            ->column('toId', $this->uuid($message->toId()))
            ->column('date', $message->date()->toString())
            ->column('message', $message->message())
            ->column('read', $message->read())
            ->column('hide', $message->hide());
        $this->execute();
    }
    
    public function edit(Message $message):void{
        $this->update('message') 
            ->column('fromId', $this->uuid($message->fromId()))  
            ->column('toId', $this->uuid($message->toId()))
            ->column('date', $message->date()->toString())
            ->column('message', $message->message())
            ->column('read', $message->read())
            ->column('hide', $message->hide())
            ->where()->eq('id', $this->uuid($message->id()));
        $this->execute();
    }
    
    public function listMessages(array $where = []):Collector{
        $this->select('message');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['fromId'])){
            $this->where()->eq('fromId', $this->uuid($where['fromId']));
        }
        if(isset($where['toId'])){
            $this->where()->eq('toId', $this->uuid($where['toId']));
        }
        if(isset($where['read'])){
            $this->where()->eq('read', (int)$where['read']);
        }
        if(isset($where['hide'])){
            $this->where()->eq('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}