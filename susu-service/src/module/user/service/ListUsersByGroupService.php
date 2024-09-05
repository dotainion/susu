<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\ListCommunityLinks;
use src\module\user\logic\ListUsers;

class ListUsersByCommunityService extends Service{
    protected ListUsers $users;
    protected ListCommunityLinks $links;

    public function __construct(){
        parent::__construct();
        $this->users = new ListUsers();
        $this->links = new ListCommunityLinks();
    }
    
    public function process($communityId){
        Assert::validUuid($communityId, 'Community not found.');

        $links = $this->links->communityLinks(new Id($communityId));
        $memberIdArray = array_map(fn($link)=>$link->memberId(), $links->list());
        $collector = $this->users->usersByIdArray($memberIdArray);

        $this->setOutput($collector);
        return $this;
    }
}