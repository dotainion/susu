<?php
namespace src\module\messages\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\factory\MessageFactory;
use src\module\messages\logic\AppendMessageUsers;
use src\module\messages\logic\SetMessage;

class SetMessageService extends Service{
    protected SetMessage $message;
    protected MessageFactory $factory;
    protected AppendMessageUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->message = new SetMessage();
        $this->factory = new MessageFactory();
        $this->users = new AppendMessageUsers();
    }
    
    public function process($id, $fromId, $toId, $message, $read, $hide){
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

        $this->setOutput($collector);
        return $this;
    }
}