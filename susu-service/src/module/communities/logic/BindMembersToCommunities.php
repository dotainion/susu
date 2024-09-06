<?php
namespace src\module\communities\logic;

use src\infrastructure\Collector;
use src\module\communities\repository\CommunityRepository;
use src\module\susu\logic\ListSusu;
use src\module\user\logic\ListUsers;

class BindMembersToCommunities{
    protected CommunityRepository $repo;
    protected ListCommunityLinks $communityLinks;
    protected ListUsers $users;
    protected ListSusu $susus;

    public function __construct(){
        $this->repo = new CommunityRepository();
        $this->communityLinks = new ListCommunityLinks();
        $this->users = new ListUsers();
        $this->susus = new ListSusu();
    }

    public function bindRequirements(Collector &$communities):void{
        $links = $this->communityLinks->communityLinksByIdArray($communities->idArray());
        $membersIdArray = $links->attrArray('memberId');
        $members = $this->users->usersByIdArray($membersIdArray);
        $susus = $this->susus->activeByCommunityIdArray($communities->idArray());

        foreach($communities->list() as $community){
            $membersIdArray = [];
            $memberCollector = new Collector();
            foreach($links->list() as $link){
                if($link->communityId()->toString() === $community->id()->toString()){
                    $membersIdArray[] = $link->memberId()->toString();
                }
            }
            foreach($members->list() as $member){
                if(in_array($member->id()->toString(), $membersIdArray)){
                    $memberCollector->add($member);
                }
                if($member->id()->toString() === $community->creatorId()->toString()){
                    $community->setOwner($member);
                }
            }
            if($memberCollector->hasItem()){
                $community->setMembers($memberCollector);
            }
            foreach($susus->list() as $susu){
                if($susu->communityId()->toString() === $community->id()->toString()){
                    $community->setSusu($susu);
                    break;
                }
            }
        }
    }
}