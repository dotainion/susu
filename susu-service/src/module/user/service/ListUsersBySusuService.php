<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\ListSusuLink;
use src\module\user\logic\ListUsers;

class ListUsersBySusuService extends Service{
    protected ListUsers $users;
    protected ListSusuLink $links;

    public function __construct(){
        parent::__construct();
        $this->users = new ListUsers();
        $this->links = new ListSusuLink();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Community not found.');

        $links = $this->links->links(new Id($susuId));
        $memberIdArray = array_map(fn($link)=>$link->memberId(), $links->list());
        $collector = $this->users->usersByIdArray($memberIdArray);

        $this->setOutput($collector);
        return $this;
    }
}