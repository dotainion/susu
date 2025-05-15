<?php
namespace src\module\posts\repository;

use src\infrastructure\Repository;
use src\module\posts\factory\ReactionFactory;
use src\module\posts\objects\Reaction;
use tools\infrastructure\Collector;

class ReactionRepository extends Repository{
    protected ReactionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReactionFactory();
    }
    
    public function create(Reaction $reaction):void{
        $this->insert('likes')        
            ->column('authorId', $this->uuid($reaction->authorId()))
            ->column('targetId', $this->uuid($reaction->targetId()))
            ->column('communityId', $this->uuid($reaction->communityId()))
            ->column('like', $reaction->like())
            ->column('created', $reaction->created()->toString());
        $this->execute();
    }
    
    public function edit(Reaction $reaction):void{
        $this->update('likes')
            ->column('authorId', $this->uuid($reaction->authorId()))
            ->column('communityId', $this->uuid($reaction->communityId()))
            ->column('like', $reaction->like())
            //->column('created', $reaction->created()->toString())
            ->where()->eq('targetId', $this->uuid($reaction->targetId()));
        $this->execute();
    }
    
    public function listReaction(array $where = []):Collector{
        $this->select('likes');

        if(isset($where['targetId'])){
            $this->where()->eq('targetId', $this->uuid($where['targetId']));
        }
        if(isset($where['authorId'])){
            $this->where()->eq('authorId', $this->uuid($where['authorId']));
        }
        if(isset($where['communityId'])){
            $this->where()->eq('communityId', $this->uuid($where['communityId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}