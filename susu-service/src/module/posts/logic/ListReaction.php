<?php
namespace src\module\posts\logic;

use src\module\posts\repository\ReactionRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListReaction{
    protected ReactionRepository $repo;

    public function __construct(){
        $this->repo = new ReactionRepository();
    }

    public function byCommunityId(Id $communityId):Collector{
        return $this->repo->listReaction([
            'communityId' => $communityId
        ]);
    }

    public function byTargetId(Id $targetId):Collector{
        return $this->repo->listReaction([
            'targetId' => $targetId
        ]);
    }

    public function byTargetIdArray(Array $targetIdArray):Collector{
        if(empty($targetIdArray)){
            return new Collector();
        }
        return $this->repo->listReaction([
            'targetId' => $targetIdArray
        ]);
    }
}