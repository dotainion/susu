<?php
namespace src\module\posts\service;

use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use src\infrastructure\Service;
use src\module\posts\factory\ReactionFactory;
use src\module\posts\logic\SetReaction;

class SetReactionService extends Service{
    protected SetReaction $save;
    protected ReactionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->save = new SetReaction();
        $this->factory = new ReactionFactory();
    }
    
    public function process($targetId, $communityId, $like){
        Assert::validUuid($targetId, 'Target not found.');
        Assert::validUuid($communityId, 'Community not found.');

        $like = $this->factory->mapResult([
            'targetId' => $targetId,
            'authorId' => $this->user()->id()->toString(),
            'communityId' => $communityId,
            'like' => $like,
            'created' => (new DateHelper())->new()->toString(),
        ]);

        $this->save->set($like);

        $this->setOutput($like);
        return $this;
    }
}