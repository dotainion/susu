<?php
namespace src\module\communities\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\ListCommunities;

class MemberCommunitiesService extends Service{
    protected ListCommunities $communities;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->communities = new ListCommunities();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($memberId){
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->communities->memberCommunities(new Id($memberId));
        $collector->assertHasItem('Community not found.');
        
        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}