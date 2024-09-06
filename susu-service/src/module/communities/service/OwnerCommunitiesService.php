<?php
namespace src\module\communities\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\ListCommunities;

class OwnerCommunitiesService extends Service{
    protected ListCommunities $communities;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->communities = new ListCommunities();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($creatorId){
        Assert::validUuid($creatorId, 'Member not found.');

        $collector = $this->communities->ownerCommunities(new Id($creatorId));
        $collector->assertHasItem('Communities not found.');
        
        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}