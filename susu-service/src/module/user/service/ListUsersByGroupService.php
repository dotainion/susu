<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\ListGroupLinks;
use src\module\user\logic\ListUsers;

class ListUsersByGroupService extends Service{
    protected ListUsers $users;
    protected ListGroupLinks $links;

    public function __construct(){
        parent::__construct();
        $this->users = new ListUsers();
        $this->links = new ListGroupLinks();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Group not found.');

        $links = $this->links->groupLinks(new Id($groupId));
        $memberIdArray = array_map(fn($link)=>$link->memberId(), $links->list());
        $collector = $this->users->usersByIdArray($memberIdArray);

        $this->setOutput($collector);
        return $this;
    }
}