<?php
namespace src\module\communities\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\communities\repository\CommunityRepository;

class ListCommunities{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function communities():Collector{
        return $this->repo->listCommunities();
    }

    public function memberCommunities(Id $memberId):Collector{
        return $this->repo->listCommunities([
            'memberId' => $memberId
        ]);
    }

    public function ownerCommunities(Id $creatorId):Collector{
        return $this->repo->listCommunities([
            'creatorId' => $creatorId
        ]);
    }

    public function byName(string $name):Collector{
        if(empty($name)){
            return new Collector();
        }
        return $this->repo->listCommunities([
            'name' => $name
        ]);
    }

    public function byIdArray(array $communityIdArray):Collector{
        if(empty($communityIdArray)){
            return new Collector();
        }
        return $this->repo->listCommunities([
            'id' => $communityIdArray
        ]);
    }
}