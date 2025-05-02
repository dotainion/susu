<?php
namespace src\module\mail\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use tools\infrastructure\SendMail;
use src\infrastructure\Service;
use tools\infrastructure\Collector;
use tools\module\mail\factory\MailFactory;
use tools\module\mail\factory\RecipientFactory;

class SendMailService extends Service{
    protected SendMail $mail;
    protected MailFactory $factory;
    protected RecipientFactory $recipientsFactory;

    public function __construct(){
        parent::__construct(authCheck: false);
        $this->mail = new SendMail();
        $this->factory = new MailFactory();
        $this->recipientsFactory = new RecipientFactory();
    }
    
    public function process($subject, $body, $recipient){
        Assert::stringNotEmpty($subject, 'Mail subject is required.');
        Assert::stringNotEmpty($body, 'Mail body is required.');
        Assert::stringNotEmpty($recipient, 'Recipient is required.');

        $mail = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'subject' => $subject,
            'body' => $body,
        ]);

        $this->recipientsFactory->add(
            $this->recipientsFactory->mapResult([
                'id' => (new Id())->new()->toString(),
                'mailId' => $mail->id()->toString(),
                'userId' => (new Id())->new()->toString(),//create a new user id for each user
                'recipient' => $recipient,
            ])
        );

        $mail->setRecipients($this->recipientsFactory);
        $mail->setAttatchments(new Collector());
        
        $this->mail->setMail($mail)->send();

        $this->setOutput($mail);
        return $this;
    }
}