<?php
namespace src\module\communities\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
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