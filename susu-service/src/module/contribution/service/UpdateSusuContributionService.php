<?php
namespace src\module\contribution\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\AddContribution;
use src\module\contribution\logic\FetchContribution;

class UpdateSusuContributionService extends Service{
    protected AddContribution $save;
    protected FetchContribution $fetch;

    public function __construct(){
        parent::__construct(false);
        $this->save = new AddContribution();
        $this->fetch = new FetchContribution();
    }
    
    public function process($id, $paid, $refunded, $payout){
        Assert::validUuid($id, 'Contribution not found.');

        $collector = $this->fetch->contribution(new Id($id));
        $collector->assertHasItem('Contribution not found.');
        $contribution = $collector->first();

        $contribution->setPaid((bool)$paid);
        $contribution->setRefunded((bool)$refunded);
        $contribution->setPayout((bool)$payout);

        $this->save->add($contribution);

        $this->setOutput($contribution);
        return $this;
    }
}