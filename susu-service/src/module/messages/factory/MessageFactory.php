<?php
namespace src\module\messages\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\messages\objects\Message;

class MessageFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Message{
        $message = new Message();
        $message->setId($this->uuid($record['id']));
        $message->setFromId($this->uuid($record['fromId']));
        $message->setToId($this->uuid($record['toId']));
        $message->setDate($record['date']);
        $message->setMessage($record['message']);
        $message->setRead((bool)$record['read']);
        $message->setHide((bool)$record['hide']);
        return $message;
    }
}