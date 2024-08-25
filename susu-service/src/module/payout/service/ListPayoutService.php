<?php
namespace src\module\payout\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\refund\logic\ListRefund;

class ListPayoutService extends Service{
    protected ListRefund $refund;

    public function __construct(){
        parent::__construct(false);
        $this->refund = new ListRefund();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Susu not found.');

        $collector = $this->refund->bySusuId(new Id($susuId));
        $collector->assertHasItem('No refunds.');

        $this->setOutput($collector);
        return $this;
    }
}