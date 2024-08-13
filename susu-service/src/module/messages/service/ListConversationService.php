<?php
namespace src\module\messages\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\logic\AppendMessageUsers;
use src\module\messages\logic\ListMessages;

class ListConversationService extends Service{
    protected ListMessages $messages;
    protected AppendMessageUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->messages = new ListMessages();
        $this->users = new AppendMessageUsers();
    }
    
    public function process($memberId, $receipientId, $read){
        Assert::stringNotEmpty($memberId, 'Member not found.');
        Assert::stringNotEmpty($receipientId, 'Receipient not found.');

        $collector = $this->messages->conversation(new Id($memberId), new Id($receipientId), $read);
        $this->users->appendUsers($collector, $this->user());

        $this->setOutput($collector);
        return $this;
    }
}