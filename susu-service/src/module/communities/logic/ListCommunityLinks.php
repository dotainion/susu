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

    public function communityLinksByIdArray(Array $communityIdArray):Collector{
        return $this->repo->listJoinCommunity([
            'communityId' => $communityIdArray
        ]);
    }
}