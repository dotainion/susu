<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\FetchGroup;
use src\module\groups\logic\ListGroupLinks;
use src\module\user\logic\ListUsers;

class FetchGroupService extends Service{
    protected FetchGroup $group;
    protected ListGroupLinks $groupLinks;
    protected ListUsers $users;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct(false);
        $this->group = new FetchGroup();
        $this->groupLinks = new ListGroupLinks();
        $this->users = new ListUsers();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Group not found.');
        
        $collector = $this->group->group(new Id($id));
        $collector->assertHasItem('Group not found.');

        $groupLinks = $this->groupLinks->groupLinksByIdArray($collector->idArray());
        $membersIdArray = $groupLinks->attrArray('memberId');
        $usersCollector = $this->users->usersByIdArray($membersIdArray);

        $this->bind->bind($collector, $usersCollector, $groupLinks);
        $this->setOutput($collector);
        
        return $this;
    }
}