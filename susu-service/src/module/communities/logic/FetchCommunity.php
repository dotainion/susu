<?php
namespace src\module\communities\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\communities\repository\CommunityRepository;

class FetchCommunity{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function community(Id $id):Collector{
        return $this->repo->listCommunities([
            'id' => $id
        ]);
    }
}