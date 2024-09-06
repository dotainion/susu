<?php
namespace src\module\communities\service;

use src\infrastructure\Service;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\ListCommunities;

class ListCommunitiesService extends Service{
    protected ListCommunities $communities;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->communities = new ListCommunities();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process(){
        $collector = $this->communities->communities();
        $collector->assertHasItem('Community not found.');
        
        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}