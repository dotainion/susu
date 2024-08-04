<?php
namespace src\module\groups\logic;

use src\module\groups\objects\GroupLink;
use src\module\groups\repository\GroupRepository;

class UnlinkGroup{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function unlink(GroupLink $link):void{
        $this->repo->unlinkGroup($link);
    }
}