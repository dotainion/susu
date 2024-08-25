<?php
namespace src\module\refund\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\refund\factory\RefundFactory;
use src\module\refund\logic\AddRefund;
use src\module\susu\logic\AssertUserInSusu;

class AddSusuRefundService extends Service{
    protected AddRefund $save;
    protected RefundFactory $factory;

    public function __construct(){
        parent::__construct(false);
        $this->save = new AddRefund();
        $this->factory = new RefundFactory();
    }
    
    public function process($susuId, $memberId, $amount){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $refund = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'susuId' => $susuId,
            'date' => (new DateHelper())->new()->toString(),
            'memberId' => $memberId,
            'amount' => $amount,
            'setDescription' => null
        ]);

        (new AssertUserInSusu())->assertUserInSusu($refund->memberId(), $refund->susuId());

        $this->save->add($refund);

        $this->setOutput($refund);
        return $this;
    }
}