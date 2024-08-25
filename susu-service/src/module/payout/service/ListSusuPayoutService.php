<?php
namespace src\module\payout\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\payout\logic\ListPayout;

class ListSusuPayoutService extends Service{
    protected ListPayout $contribution;

    public function __construct(){
        parent::__construct(false);
        $this->contribution = new ListPayout();
    }
    
    public function process($susuId, $memberId){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->contribution->history(new Id($susuId), new Id($memberId));
        $collector->assertHasItem('No contribution.');

        $this->setOutput($collector);
        return $this;
    }
}