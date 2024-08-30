<?php
namespace src\module\refund\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\refund\logic\ListRefund;

class ListRefundService extends Service{
    protected ListRefund $refund;

    public function __construct(){
        parent::__construct();
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