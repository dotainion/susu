<?php
namespace src\module\communities\logic;

use tools\infrastructure\Collector;
use src\module\communities\repository\CommunityRepository;
use src\module\posts\logic\ListReaction;
use src\module\susu\logic\ListSusu;
use src\module\user\logic\ListUsers;

class BindMembersToCommunities{
    protected CommunityRepository $repo;
    protected ListCommunityLinks $communityLinks;
    protected ListUsers $users;
    protected ListSusu $susus;
    protected ListReaction $reactions;

    public function __construct(){
        $this->repo = new CommunityRepository();
        $this->communityLinks = new ListCommunityLinks();
        $this->users = new ListUsers();
        $this->susus = new ListSusu();
        $this->reactions = new ListReaction();
    }

    public function bindRequirements(Collector &$communities):void{
        $links = $this->communityLinks->communityLinksByIdArray($communities->idArray());
        $membersIdArray = $links->attrArray('memberId');
        $members = $this->users->usersByIdArray($membersIdArray);
        $susus = $this->susus->activeByCommunityIdArray($communities->idArray());
        $reactions = $this->reactions->byTargetIdArray($communities->idArray());

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
            $susuCollector = $susus->filter('communityId', $community->id()->toString());
            if($susuCollector->hasItem()){
                $community->setSusu($susuCollector->first());
            }
            $reactionCollector = $reactions->filter('targetId', $community->id()->toString());
            $community->likes()->mergeCollection($reactionCollector);
        }
    }
}