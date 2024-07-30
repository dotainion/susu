<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\susu\objects\Susu;
use src\module\user\logic\ListUsers;

class FetchSusuService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Susu not found.');

        $collector = $this->susu->byId(new Id($susuId));
        $collector->assertHasItem('No active susu found.');
        $susu = $collector->first();

        $links = $this->links->links($susu->groupId());
        $members = $this->users->usersByIdArray($links->attrArray('memberId'));

        $members->hasItem() && $susu->setMembers($members);

        $this->setOutput($susu);
        return $this;
    }
}