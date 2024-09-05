<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\FetchCommunity;
use src\module\susu\factory\SusuFactory;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\SetSusu;

class SetSusuService extends Service{
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
    
    public function process($susuId, $contribution, $cycle, $accurance, $startDate, $communityId, $pendingStart, $completed, $canceled){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($communityId, 'Community not found.');

        $collector = $this->activeSusu->byId(new Id($susuId));
        $collector->assertHasItem('Susu not found.');

        $susu = $this->factory->mapResult([
            'id' => $susuId,
            'contribution' => $contribution,
            'cycle' => $cycle,
            'accurance' => (int)$accurance,
            'startDate' => $startDate,
            'communityId' => $communityId,
            'pendingStart' => $pendingStart,
            'completed' => $completed,
            'canceled' => $canceled,
        ]);

        $this->susu->set($susu);

        $this->setOutput($susu);
        return $this;
    }
}