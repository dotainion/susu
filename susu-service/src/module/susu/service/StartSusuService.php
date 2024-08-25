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

class StartSusuService extends Service{
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
    
    public function process($groupId, $accurance, $contribution, $cycle){
        Assert::validUuid($groupId, 'Group not found.');

        $susuCollector = $this->activeSusu->activeByGroupId(new Id($groupId));
        if($susuCollector->hasItem()){
            throw new InvalidArgumentException('Susu already stared.');
        }

        $collector = $this->group->group(new Id($groupId));
        $collector->assertHasItem('Group not found.');
        $group = $collector->first();

        $susu = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'contribution' => $contribution,
            'cycle' => $cycle,
            'accurance' => (int)$accurance,
            'startDate' => (new DateHelper())->new()->toString(),
            'groupId' => $group->id()->toString(),
            'pendingStart' => true,
            'completed' => false,
        ]);

        $this->susu->set($susu);

        $this->setOutput($susu);
        return $this;
    }
}