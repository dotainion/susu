<?php
namespace src\module\refund\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\refund\logic\ListRefund;

class ListSusuRefundService extends Service{
    protected ListRefund $refund;

    public function __construct(){
        parent::__construct(false);
        $this->refund = new ListRefund();
    }
    
    public function process($susuId, $memberId){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->refund->history(new Id($susuId), new Id($memberId));
        $collector->assertHasItem('No refunds.');

        $this->setOutput($collector);
        return $this;
    }
}