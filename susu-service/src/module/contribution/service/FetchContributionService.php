<?php
namespace src\module\contribution\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\ListContribution;

class FetchContributionService extends Service{
    protected ListContribution $contribution;

    public function __construct(){
        parent::__construct();
        $this->contribution = new ListContribution();
    }
    
    public function process($contributionId){
        Assert::validUuid($contributionId, 'Contribution not found.');

        $collector = $this->contribution->byId(new Id($contributionId));
        $collector->assertHasItem('No contribution.');

        $this->setOutput($collector);
        return $this;
    }
}