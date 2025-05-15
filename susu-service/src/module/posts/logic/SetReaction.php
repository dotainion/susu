<?php
namespace src\module\posts\logic;

use src\module\posts\objects\Reaction;
use src\module\posts\repository\ReactionRepository;

class SetReaction{
    protected ReactionRepository $repo;

    public function __construct(){
        $this->repo = new ReactionRepository();
    }

    public function set(Reaction $reaction):void{
        $collector = $this->repo->listReaction([
            'targetId' => $reaction->targetId()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($reaction);
            return;
        }
        $this->repo->edit($reaction);
    }
}