<?php
namespace src\module\communities\logic;

use src\module\communities\objects\CommunityLink;
use src\module\communities\repository\CommunityRepository;

class JoinCommunity{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function join(CommunityLink $link):void{
        $collector = $this->repo->listJoinCommunity([
            'communityId' => $link->communityId(),
            'memberId' => $link->memberId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->joinCommunity($link);
    }
}