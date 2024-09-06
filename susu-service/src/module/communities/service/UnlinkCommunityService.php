<?php
namespace src\module\communities\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\communities\factory\CommunityLinkFactory;
use src\module\communities\logic\FetchCommunity;
use src\module\communities\logic\UnlinkCommunity;

class UnlinkCommunityService extends Service{
    protected UnlinkCommunity $community;
    protected FetchCommunity $fetch;
    protected CommunityLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->community = new UnlinkCommunity();
        $this->fetch = new FetchCommunity();
        $this->factory = new CommunityLinkFactory();
    }
    
    public function process($communityId, $memberId){
        Assert::validUuid($communityId, 'Community not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $link = $this->factory->mapResult([
            'communityId' => $communityId,
            'memberId' => $memberId,
        ]);

        $this->community->unlink($link);
        $collector = $this->fetch->community($link->communityId());
        
        $this->setOutput($collector);
        return $this;
    }
}