<?php
namespace src\module\communities\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\factory\CommunityFactory;
use src\module\communities\factory\CommunityLinkFactory;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\JoinCommunity;
use src\module\communities\logic\SetCommunity;

class SetCommunityService extends Service{
    protected CommunityFactory $factory;
    protected CommunityLinkFactory $linkFactory;
    protected SetCommunity $community;
    protected JoinCommunity $join;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->factory = new CommunityFactory();
        $this->linkFactory = new CommunityLinkFactory();
        $this->community = new SetCommunity();
        $this->join = new JoinCommunity();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($id, $name, $description, $cycle, $hide){
        $idObj = new Id();
        $communityId = $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $collector = $this->factory->map([[
            'id' => $communityId->toString(),
            'name' => $name,
            'description' => $description,
            'cycle' => $cycle,
            'createdDate' => (new DateHelper())->new()->toString(),
            'creatorId' => $this->user()->id()->toString(),
            'hide' => $hide
        ]]);
        $community = $collector->first();

        $link = $this->linkFactory->mapResult([
            'CommunityId' => $community->id()->toString(),
            'memberId' => $this->user()->id()->toString(),
        ]);

        $this->community->set($community);
        $this->join->join($link);

        $this->bind->bindRequirements($collector);

        $this->setOutput($collector);
        return $this;
    }
}