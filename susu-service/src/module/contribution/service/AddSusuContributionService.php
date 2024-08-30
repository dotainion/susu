<?php
namespace src\module\contribution\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\factory\ContributionFactory;
use src\module\contribution\logic\AddContribution;
use src\module\susu\logic\AssertUserInSusu;

class AddSusuContributionService extends Service{
    protected AddContribution $save;
    protected ContributionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->save = new AddContribution();
        $this->factory = new ContributionFactory();
    }
    
    public function process($susuId, $memberId, $contribution){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $history = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'susuId' => $susuId,
            'date' => (new DateHelper())->new()->toString(),
            'memberId' => $memberId,
            'contribution' => $contribution,
            'setDescription' => null
        ]);

        (new AssertUserInSusu())->assertUserInSusu($history->memberId(), $history->susuId());

        $this->save->add($history);

        $this->setOutput($history);
        return $this;
    }
}