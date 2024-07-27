<?php
namespace src\module\susu\logic;

use src\module\susu\objects\SusuLink;
use src\module\susu\repository\SusuLinkRepository;

class UnlinkSusu{
    protected SusuLinkRepository $repo;

    public function __construct(){
        $this->repo = new SusuLinkRepository();
    }

    public function unlink(SusuLink $link):void{
        $this->repo->deleteSusu($link);
    }
}