<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\user\logic\ListUsers;

class FetchActiveSusuService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Ground not found.');

        $collector = $this->susu->activeByGroupId(new Id($groupId));
        $collector->assertHasItem('No active susu found.');
        $susu = $collector->first();

        $links = $this->links->links($susu->id());
        $members = $this->users->usersByIdArray($links->attrArray('memberId'));

        $members->hasItem() && $susu->setMembers($members);

        $this->setOutput($susu);
        return $this;
    }
}