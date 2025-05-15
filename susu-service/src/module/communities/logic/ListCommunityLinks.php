<?php
namespace src\module\communities\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\communities\repository\CommunityRepository;

class ListCommunityLinks{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function communityLinks(Id $communityId):Collector{
        return $this->repo->listJoinCommunity([
            'communityId' => $communityId
        ]);
    }

    public function byMemberId(Id $memberId):Collector{
        return $this->repo->listJoinCommunity([
            'memberId' => $memberId
        ]);
    }

    public function byMemberIdArray(Array $memberIdArray):Collector{
        if(empty($memberIdArray)){
            return new Collector();
        }
        return $this->repo->listJoinCommunity([
            'memberId' => $memberIdArray
        ]);
    }

    public function communityLinksByIdArray(Array $communityIdArray):Collector{
        if(empty($communityIdArray)){
            return new Collector();
        }
        return $this->repo->listJoinCommunity([
            'communityId' => $communityIdArray
        ]);
    }
}