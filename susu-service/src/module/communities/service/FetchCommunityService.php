<?php
namespace src\module\communities\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\FetchCommunity;

class FetchCommunityService extends Service{
    protected FetchCommunity $community;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->community = new FetchCommunity();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Community not found.');
        
        $collector = $this->community->community(new Id($id));
        $collector->assertHasItem('Community not found.');

        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        
        return $this;
    }
}