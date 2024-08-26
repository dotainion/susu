<?php
namespace src\module\payout\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\payout\factory\PayoutFactory;
use src\module\payout\logic\AddPayout;
use src\module\susu\logic\AssertUserInSusu;

class AddSusuPayoutService extends Service{
    protected AddPayout $save;
    protected PayoutFactory $factory;

    public function __construct(){
        parent::__construct(false);
        $this->save = new AddPayout();
        $this->factory = new PayoutFactory();
    }
    
    public function process($susuId, $memberId, $amount, $scheduleId){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');
        Assert::validUuid($scheduleId, 'Schedule not found.');

        $payout = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'susuId' => $susuId,
            'date' => (new DateHelper())->new()->toString(),
            'memberId' => $memberId,
            'amount' => $amount,
            'scheduleId' => $scheduleId,
            'setDescription' => null
        ]);

        (new AssertUserInSusu())->assertUserInSusu($payout->memberId(), $payout->susuId());

        $this->save->add($payout);

        $this->setOutput($payout);
        return $this;
    }
}