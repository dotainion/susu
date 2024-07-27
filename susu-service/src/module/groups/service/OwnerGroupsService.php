<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\ListGroupLinks;
use src\module\groups\logic\ListGroups;
use src\module\user\logic\ListUsers;

class OwnerGroupsService extends Service{
    protected ListGroups $groups;
    protected ListGroupLinks $groupLinks;
    protected ListUsers $users;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct(false);
        $this->groups = new ListGroups();
        $this->groupLinks = new ListGroupLinks();
        $this->users = new ListUsers();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($creatorId){
        Assert::validUuid($creatorId, 'Member not found.');

        $collector = $this->groups->ownerGroups(new Id($creatorId));
        $collector->assertHasItem('Groups not found.');

        $groupLinks = $this->groupLinks->groupLinksByIdArray($collector->idArray());
        $membersIdArray = $groupLinks->attrArray('memberId');
        $usersCollector = $this->users->usersByIdArray($membersIdArray);
        
        $this->bind->bind($collector, $usersCollector, $groupLinks);
        $this->setOutput($collector);
        return $this;
    }
}