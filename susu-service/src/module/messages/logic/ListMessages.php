<?php
namespace src\module\messages\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\messages\repository\MessageRepository;

class ListMessages{
    protected MessageRepository $repo;

    public function __construct(){
        $this->repo = new MessageRepository();
    }

    public function conversationByOwnerId(Id $memberId):Collector{
        return $this->repo->listMessages([
            'fromId' => $memberId,
            'hide' => false
        ])->mergeCollection(
            (new $this->repo)->listMessages([
                'toId' => $memberId,
                'hide' => false
            ])
        );
    }

    public function unSeenConversations(Id $memberId):Collector{
        return $this->repo->listMessages([
            'toId' => $memberId,
            'read' => false,
            'hide' => false
        ]);
    }

    public function conversation(Id $fromId, Id $toId, ?bool $read):Collector{
        return $this->repo->listMessages([
            'fromId' => $fromId,
            'toId' => $toId,
            'read' => $read,
            'hide' => false
        ])->mergeCollection(
            (new $this->repo)->listMessages([
                'fromId' => $toId,
                'toId' => $fromId,
                'read' => $read,
                'hide' => false
            ])
        );
    }

    public function communityConversation(Id $toId, ?bool $read):Collector{
        return $this->repo->listMessages([
            'toId' => $toId,
            'read' => $read,
            'hide' => false
        ]);
    }
}