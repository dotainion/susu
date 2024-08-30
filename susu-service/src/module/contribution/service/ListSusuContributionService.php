<?php
namespace src\module\contribution\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\ListContribution;

class ListSusuContributionService extends Service{
    protected ListContribution $contribution;

    public function __construct(){
        parent::__construct();
        $this->contribution = new ListContribution();
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