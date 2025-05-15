<?php
namespace src\module\posts\logic;

use src\module\posts\repository\PostRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListPost{
    protected PostRepository $repo;

    public function __construct(){
        $this->repo = new PostRepository();
    }

    public function byCommunityId(Id $communityId):Collector{
        return $this->repo->listPosts([
            'communityId' => $communityId
        ]);
    }
}