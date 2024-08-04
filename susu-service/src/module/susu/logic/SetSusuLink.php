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
        if($collector->hasItem()){
            //position should mostlikely be set only when editing.. 
            //at the point of joing a choice of position should not be available
            if(!is_int($link->position())){
                throw new InvalidArgumentException('A schedule payout was not selected.');
            }
            $this->repo->editPosition($link);
            return;
        }
        $this->repo->create($link);
    }
}