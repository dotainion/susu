<?php
namespace src\module\messages\repository;

use src\database\Repository;
use src\infrastructure\Collector;
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
            ->add('id', $this->uuid($message->id()))
            ->add('fromId', $this->uuid($message->fromId()))  
            ->add('toId', $this->uuid($message->toId()))
            ->add('date', $message->date()->toString())
            ->add('message', $message->message())
            ->add('read', $message->read())
            ->add('hide', $message->hide());
        $this->execute();
    }
    
    public function edit(Message $message):void{
        $this->insert('message') 
            ->set('fromId', $this->uuid($message->fromId()))  
            ->set('toId', $this->uuid($message->toId()))
            ->set('date', $message->date()->toString())
            ->set('message', $message->message())
            ->set('read', $message->read())
            ->set('hide', $message->hide())
            ->where('id', $this->uuid($message->id()));
        $this->execute();
    }
    
    public function listMessages(array $where = []):Collector{
        $this->select('message');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['fromId'])){
            $this->where('fromId', $this->uuid($where['fromId']));
        }
        if(isset($where['toId'])){
            $this->where('toId', $this->uuid($where['toId']));
        }
        if(isset($where['read'])){
            $this->where('read', (int)$where['read']);
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}