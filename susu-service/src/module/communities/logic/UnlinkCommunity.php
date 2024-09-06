<?php
namespace src\module\communities\logic;

use src\module\communities\objects\CommunityLink;
use src\module\communities\repository\CommunityRepository;

class UnlinkCommunity{
    protected CommunityRepository $repo;

    public function __construct(){
        $this->repo = new CommunityRepository();
    }

    public function unlink(CommunityLink $link):void{
        $this->repo->unlinkCommunity($link);
    }
}