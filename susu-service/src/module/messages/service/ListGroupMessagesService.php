<?php
namespace src\module\messages\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\logic\AppendMessageUsers;
use src\module\messages\logic\ListMessages;

class ListCommunityMessagesService extends Service{
    protected ListMessages $messages;
    protected AppendMessageUsers $users;

    public function __construct(){
        parent::__construct();
        $this->messages = new ListMessages();
        $this->users = new AppendMessageUsers();
    }
    
    public function process($communityId, $read){
        Assert::stringNotEmpty($communityId, 'Community not found.');

        $conversations = $this->messages->communityConversation(new Id($communityId), $read);
        $collector = $this->users->appendUsers($conversations, $this->user());

        $this->setOutput($collector);
        return $this;
    }
}