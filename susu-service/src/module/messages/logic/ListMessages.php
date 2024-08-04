<?php
namespace src\module\messages\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\messages\repository\MessageRepository;

class ListMessages{
    protected MessageRepository $repo;

    public function __construct(){
        $this->repo = new MessageRepository();
    }

    public function conversation(Id $fromId, Id $toId):Collector{
        return $this->repo->listMessages([
            'fromId' => $fromId,
            'toId' => $toId,
            'hide' => false
        ]);
    }

    public function groupConversation(Id $toId):Collector{
        return $this->repo->listMessages([
            'toId' => $toId,
            'hide' => false
        ]);
    }
}