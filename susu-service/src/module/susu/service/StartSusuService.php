<?php
namespace src\module\susu\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\FetchCommunity;
use src\module\susu\factory\SusuFactory;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\SetSusu;

class StartSusuService extends Service{
    protected SetSusu $susu;
    protected FetchCommunity $community;
    protected SusuFactory $factory;
    protected FetchSusu $activeSusu;

    public function __construct(){
        parent::__construct();
        $this->susu = new SetSusu();
        $this->community = new FetchCommunity();
        $this->factory = new SusuFactory();
        $this->activeSusu = new FetchSusu();
    }
    
    public function process($communityId, $accurance, $contribution, $cycle){
        Assert::validUuid($communityId, 'Community not found.');

        $susuCollector = $this->activeSusu->activeByCommunityId(new Id($communityId));
        if($susuCollector->hasItem()){
            throw new InvalidArgumentException('Susu already stared.');
        }

        $collector = $this->community->community(new Id($communityId));
        $collector->assertHasItem('Community not found.');
        $community = $collector->first();

        $susu = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'contribution' => $contribution,
            'cycle' => $cycle,
            'accurance' => (int)$accurance,
            'startDate' => (new DateHelper())->new()->toString(),
            'communityId' => $community->id()->toString(),
            'pendingStart' => true,
            'completed' => false,
        ]);

        $this->susu->set($susu);

        $this->setOutput($susu);
        return $this;
    }
}