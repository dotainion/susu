<?php
namespace src\module\groups\service;

use src\infrastructure\Service;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\ListGroupLinks;
use src\module\groups\logic\ListGroups;
use src\module\user\logic\ListUsers;

class ListGroupsService extends Service{
    protected ListGroups $groups;
    protected ListGroupLinks $groupLinks;
    protected BindMembersToGroups $bind;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->groups = new ListGroups();
        $this->groupLinks = new ListGroupLinks();
        $this->bind = new BindMembersToGroups();
        $this->users = new ListUsers();
    }
    
    public function process(){
        $collector = $this->groups->groups();
        $collector->assertHasItem('Group not found.');

        $groupLinks = $this->groupLinks->groupLinksByIdArray($collector->idArray());
        $membersIdArray = $groupLinks->attrArray('memberId');
        $usersCollector = $this->users->usersByIdArray($membersIdArray);
        
        $this->bind->bind($collector, $usersCollector, $groupLinks);
        $this->setOutput($collector);
        return $this;
    }
}