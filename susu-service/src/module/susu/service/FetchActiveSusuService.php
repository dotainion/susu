<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\FetchCommunity;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\user\logic\FetchUser;
use src\module\user\logic\ListUsers;

class FetchActiveSusuService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;
    protected FetchUser $user;
    protected FetchCommunity $community;

    public function __construct(){
        parent::__construct();
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
        $this->user = new FetchUser();
        $this->community = new FetchCommunity();
    }
    
    public function process($communityId){
        Assert::validUuid($communityId, 'Community not found.');

        $communityCollector = $this->community->community(new Id($communityId));
        $communityCollector->assertHasItem('Community not found.');
        $community = $communityCollector->first();

        $collector = $this->susu->activeByCommunityId($community->id());
        $collector->assertHasItem('No active susu found.');
        $susu = $collector->first();

        $links = $this->links->links($susu->id());
        $members = $this->users->usersByIdArray($links->attrArray('memberId'));
        $owners = $this->user->user($community->creatorId());

        $members->hasItem() && $susu->setMembers($members);
        $owners->hasItem() && $susu->setOwner($owners->first());

        $this->setOutput($susu);
        return $this;
    }
}