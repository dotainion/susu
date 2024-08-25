<?php
namespace src\module\contribution\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\ListContribution;

class ListContributionService extends Service{
    protected ListContribution $contribution;

    public function __construct(){
        parent::__construct(false);
        $this->contribution = new ListContribution();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Susu not found.');

        $collector = $this->contribution->bySusuId(new Id($susuId));
        $collector->assertHasItem('No contribution.');

        $this->setOutput($collector);
        return $this;
    }
}