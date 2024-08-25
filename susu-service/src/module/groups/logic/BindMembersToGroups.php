<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\module\groups\repository\GroupRepository;
use src\module\susu\logic\ListSusu;
use src\module\user\logic\ListUsers;

class BindMembersToGroups{
    protected GroupRepository $repo;
    protected ListGroupLinks $groupLinks;
    protected ListUsers $users;
    protected ListSusu $susus;

    public function __construct(){
        $this->repo = new GroupRepository();
        $this->groupLinks = new ListGroupLinks();
        $this->users = new ListUsers();
        $this->susus = new ListSusu();
    }

    public function bindRequirements(Collector &$groups):void{
        $links = $this->groupLinks->groupLinksByIdArray($groups->idArray());
        $membersIdArray = $links->attrArray('memberId');
        $members = $this->users->usersByIdArray($membersIdArray);
        $susus = $this->susus->activeByGroupIdArray($groups->idArray());

        foreach($groups->list() as $group){
            $membersIdArray = [];
            $memberCollector = new Collector();
            foreach($links->list() as $link){
                if($link->groupId()->toString() === $group->id()->toString()){
                    $membersIdArray[] = $link->memberId()->toString();
                }
            }
            foreach($members->list() as $member){
                if(in_array($member->id()->toString(), $membersIdArray)){
                    $memberCollector->add($member);
                }
                if($member->id()->toString() === $group->creatorId()->toString()){
                    $group->setOwner($member);
                }
            }
            if($memberCollector->hasItem()){
                $group->setMembers($memberCollector);
            }
            foreach($susus->list() as $susu){
                if($susu->groupId()->toString() === $group->id()->toString()){
                    $group->setSusu($susu);
                    break;
                }
            }
        }
    }
}