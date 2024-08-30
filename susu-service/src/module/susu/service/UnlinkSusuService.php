<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\factory\SusuLinkFactory;
use src\module\susu\logic\UnlinkSusu;
use src\module\susu\logic\FetchSusu;

class UnlinkSusuService extends Service{
    protected UnlinkSusu $link;
    protected FetchSusu $susu;
    protected SusuLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->link = new UnlinkSusu();
        $this->susu = new FetchSusu();
        $this->factory = new SusuLinkFactory();
    }
    
    public function process($memberId, $groupId){
        Assert::validUuid($memberId, 'User not found.');
        Assert::validUuid($groupId, 'Group not found.');

        $collector = $this->susu->activeByGroupId(new Id($groupId));
        $collector->assertHasItem('Susu not yet stared.');
        $susu = $collector->first();

        $link = $this->factory->mapResult([
            'susuId' => $susu->id()->toString(),
            'memberId' => $memberId,
            'position' => null,
        ]);

        $this->link->unlink($link);

        $this->setOutput($collector);
        return $this;
    }
}