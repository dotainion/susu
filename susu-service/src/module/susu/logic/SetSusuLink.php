<?php
namespace src\module\susu\logic;

use InvalidArgumentException;
use src\module\susu\objects\SusuLink;
use src\module\susu\repository\SusuLinkRepository;

class SetSusuLink{
    protected SusuLinkRepository $repo;

    public function __construct(){
        $this->repo = new SusuLinkRepository();
    }

    public function set(SusuLink $link):void{
        $collector = $this->repo->listSusuLink([
            'susuId' => $link->susuId(),
            'memberId' => $link->memberId()
        ]);
        if($collector->hasItem() && !$link->position()){
            return;
        }
        if($collector->hasItem()){
            $this->repo->edit($link);
            return;
        }
        $this->repo->create($link);
    }
}