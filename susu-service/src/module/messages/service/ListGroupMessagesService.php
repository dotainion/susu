<?php
namespace src\module\messages\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\logic\AppendMessageUsers;
use src\module\messages\logic\ListMessages;

class ListGroupMessagesService extends Service{
    protected ListMessages $messages;
    protected AppendMessageUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->messages = new ListMessages();
        $this->users = new AppendMessageUsers();
    }
    
    public function process($groupId){
        Assert::stringNotEmpty($groupId, 'Group not found.');

        $collector = $this->messages->groupConversation(new Id($groupId));
        $this->users->appendUsers($collector, $this->user());

        $this->setOutput($collector);
        return $this;
    }
}