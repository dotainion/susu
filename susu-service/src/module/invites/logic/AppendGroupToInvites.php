<?php
namespace src\module\invites\logic;

use tools\infrastructure\Collector;
use src\module\communities\logic\ListCommunities;
use src\module\communities\logic\ListCommunityLinks;
use src\module\invites\objects\Invite;
use src\module\susu\logic\ListSusu;

class AppendCommunityToInvites{
    protected ListSusu $susu;
    protected ListCommunities $communities;
    protected ListCommunityLinks $communityLink;

    public function __construct(){
        $this->susu = new ListSusu();
        $this->communities = new ListCommunities();
        $this->communityLink = new ListCommunityLinks();
    }

    public function appendCommunities(Collector &$collector):void{
        $targetIdArray = $collector->attrArray('targetId');
        $susus = $this->susu->byIdArray($targetIdArray);
        $targetIdArray = [...$targetIdArray, ...$susus->attrArray('communityId')];

        $references = [];
        foreach($susus->list() as $susu){
            $references[$susu->id()->toString()] = $susu->communityId()->toString();
        }

        $communities = $this->communities->byIdArray($targetIdArray);
        $communityLink = $this->communityLink->byMemberIdArray($collector->attrArray('memberId'));
        
        foreach($collector->list() as $invite){
            foreach($communities->list() as $community){
                $ref = $references[$invite->targetId()->toString()] ?? null;
                if($invite->targetId()->toString() === $community->id()->toString() || $ref === $community->id()->toString()){
                    $invite->setCommunity($community);
                }
                $communityLinkCollector = $communityLink->filter('memberId', $invite->memberId()->toString());
                $communityLinkCollectorCheck = $communityLinkCollector->filter('targetId', $community->id()->toString());
                if($communityLinkCollectorCheck->hasItem()){
                    $invite->setIsGroupMember(true);
                }
            }
        }
    }

    public function appendCommunity(Invite $invite):void{
        $collector = new Collector();
        $collector->add($invite);
        $this->appendCommunities($collector);
    }
}