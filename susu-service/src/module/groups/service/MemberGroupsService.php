<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\ListGroups;

class MemberGroupsService extends Service{
    protected ListGroups $groups;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct();
        $this->groups = new ListGroups();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($memberId){
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->groups->memberGroups(new Id($memberId));
        $collector->assertHasItem('Groups not found.');
        
        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}