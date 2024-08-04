<?php
namespace src\module\susu\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\FetchGroup;
use src\module\susu\factory\SusuFactory;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\SetSusu;

class SetSusuService extends Service{
    protected SetSusu $susu;
    protected FetchGroup $group;
    protected SusuFactory $factory;
    protected FetchSusu $activeSusu;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new SetSusu();
        $this->group = new FetchGroup();
        $this->factory = new SusuFactory();
        $this->activeSusu = new FetchSusu();
    }
    
    public function process($susuId, $contribution, $cycle, $payoutDate, $startDate, $groupId, $pendingStart, $completed, $canceled){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($groupId, 'Group not found.');

        $collector = $this->activeSusu->byId(new Id($susuId));
        $collector->assertHasItem('Susu not found.');

        $susu = $this->factory->mapResult([
            'id' => $susuId,
            'contribution' => $contribution,
            'cycle' => $cycle,
            'payoutDate' => $payoutDate,
            'startDate' => $startDate,
            'groupId' => $groupId,
            'pendingStart' => $pendingStart,
            'completed' => $completed,
            'canceled' => $canceled,
        ]);

        $this->susu->set($susu);

        $this->setOutput($susu);
        return $this;
    }
}