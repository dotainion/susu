<?php
namespace src\module\communities\logic;

use src\module\communities\objects\Community;
use src\module\communities\repository\CommunityRepository;

class SetCommunity{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function set(Community $community):void{
        $collector = $this->repo->listCommunities([
            'id' => $community->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($community);
            return;
        }
        $this->repo->create($community);
    }
}