<?php
namespace src\module\refund\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\FetchContribution;
use src\module\refund\factory\RefundFactory;
use src\module\refund\logic\AddRefund;
use src\module\susu\logic\AssertUserInSusu;

class AddSusuRefundService extends Service{
    protected AddRefund $save;
    protected RefundFactory $factory;
    protected FetchContribution $fetchContribution;

    public function __construct(){
        parent::__construct();
        $this->save = new AddRefund();
        $this->factory = new RefundFactory();
        $this->fetchContribution = new FetchContribution();
    }
    
    public function process($susuId, $memberId, $amount, $contributionId, $reason, $type){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $refund = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'susuId' => $susuId,
            'date' => (new DateHelper())->new()->toString(),
            'memberId' => $memberId,
            'amount' => $amount,
            'contributionId' => $contributionId,
            'setDescription' => null,
            'reason' => $reason,
            'type' => $type
        ]);

        $collector = $this->fetchContribution->contribution($refund->contributionId());
        $collector->assertHasItem('Contribution not found.');
        $contribution = $collector->first();

        if((float)$refund->amount() > (float)$contribution->contribution()){
            throw new InvalidArgumentException('The refund cannot exceed the amount of the contribution.');
        }

        (new AssertUserInSusu())->assertUserInSusu($refund->memberId(), $refund->susuId());

        $this->save->add($refund);

        $this->setOutput($refund);
        return $this;
    }
}