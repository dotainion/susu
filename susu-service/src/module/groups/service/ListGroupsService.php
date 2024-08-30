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
        parent::__construct();
        $this->groups = new ListGroups();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process(){
        $collector = $this->groups->groups();
        $collector->assertHasItem('Group not found.');
        
        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}