<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\FetchGroup;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\user\logic\FetchUser;
use src\module\user\logic\ListUsers;

class FetchActiveSusuService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;
    protected FetchUser $user;
    protected FetchGroup $group;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
        $this->user = new FetchUser();
        $this->group = new FetchGroup();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Group not found.');

        $groupCollector = $this->group->group(new Id($groupId));
        $groupCollector->assertHasItem('Group not found.');
        $group = $groupCollector->first();

        $collector = $this->susu->activeByGroupId($group->id());
        $collector->assertHasItem('No active susu found.');
        $susu = $collector->first();

        $links = $this->links->links($susu->id());
        $members = $this->users->usersByIdArray($links->attrArray('memberId'));
        $owners = $this->user->user($group->creatorId());

        $members->hasItem() && $susu->setMembers($members);
        $owners->hasItem() && $susu->setOwner($owners->first());

        $this->setOutput($susu);
        return $this;
    }
}