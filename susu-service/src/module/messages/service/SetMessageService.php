<?php
namespace src\module\messages\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\messages\factory\MessageFactory;
use src\module\messages\logic\SetMessage;

class SetMessageService extends Service{
    protected SetMessage $message;
    protected MessageFactory $factory;

    public function __construct(){
        parent::__construct(false);
        $this->message = new SetMessage();
        $this->factory = new MessageFactory();
    }
    
    public function process($id, $fromId, $toId, $message, $hide){
        Assert::stringNotEmpty($fromId, 'Sender not found.');
        Assert::stringNotEmpty($toId, 'Recipient not found.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $message = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'fromId' => $fromId,
            'toId' => $toId,
            'date' => (new DateHelper())->new()->toString(),
            'message' => $message,
            'hide' => $hide,
        ]);

        $this->message->set($message);

        $this->setOutput($message);
        return $this;
    }
}