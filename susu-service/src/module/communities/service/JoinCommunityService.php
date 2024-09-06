<?php
namespace src\module\communities\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\communities\factory\CommunityLinkFactory;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\FetchCommunity;
use src\module\communities\logic\JoinCommunity;

class JoinCommunityService extends Service{
    protected JoinCommunity $community;
    protected FetchCommunity $fetch;
    protected CommunityLinkFactory $factory;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->community = new JoinCommunity();
        $this->fetch = new FetchCommunity();
        $this->factory = new CommunityLinkFactory();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($communityId, $memberId){
        Assert::validUuid($communityId, 'Community not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $link = $this->factory->mapResult([
            'communityId' => $communityId,
            'memberId' => $memberId,
        ]);

        $this->community->join($link);
        $collector = $this->fetch->community($link->communityId());
        $this->bind->bindRequirements($collector);

        $this->setOutput($collector);
        return $this;
    }
}