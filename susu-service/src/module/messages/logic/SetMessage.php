<?php
namespace src\module\messages\logic;

use src\module\messages\objects\Message;
use src\module\messages\repository\MessageRepository;

class SetMessage{
    protected MessageRepository $repo;

    public function __construct(){
        $this->repo = new MessageRepository();
    }

    public function set(Message $message):void{
        $collector = $this->repo->listMessages([
            'id' => $message->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($message);
            return;
        }
        $this->repo->create($message);
    }
}