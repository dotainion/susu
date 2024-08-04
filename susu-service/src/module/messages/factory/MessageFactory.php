<?php
namespace src\module\messages\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\messages\objects\Message;

class MessageFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Message{
        $history = new Message();
        $history->setId($this->uuid($record['id']));
        $history->setFromId($this->uuid($record['fromId']));
        $history->setToId($this->uuid($record['toId']));
        $history->setDate($record['date']);
        $history->setMessage($record['message']);
        $history->setHide($record['hide']);
        return $history;
    }
}