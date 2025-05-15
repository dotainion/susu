<?php
namespace src\module\messages\service;

use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\factory\MessageFactory;
use src\module\messages\logic\AppendMessageUsers;
use src\module\messages\logic\SetMessage;
use tools\SecurityTools;

class SetMessageService extends Service{
    protected SetMessage $message;
    protected MessageFactory $factory;
    protected AppendMessageUsers $users;
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct();
        $this->message = new SetMessage();
        $this->factory = new MessageFactory();
        $this->users = new AppendMessageUsers();
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $fromId, $toId, $message, $read, $hide, $channel, $event){
        Assert::stringNotEmpty($fromId, 'Sender not found.');
        Assert::stringNotEmpty($toId, 'Recipient not found.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $collector = $this->factory->map([[
            'id' => $idObj->toString(),
            'fromId' => $fromId,
            'toId' => $toId,
            'date' => (new DateHelper())->new()->toString(),
            'message' => $message,
            'read' => $read,
            'hide' => $hide,
        ]]);

        $this->message->set($collector->first());
        $this->users->appendUsers($collector, $this->user());
        $this->secure->pusherMessanger($channel, $event, $collector->first());

        $this->setOutput($collector);
        return $this;
    }
}