<?php
namespace src\module\posts\factory;

use src\module\posts\objects\Reaction;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class ReactionFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Reaction{
        $reaction = new Reaction();
        $reaction->setId($this->uuid($record['targetId']));
        $reaction->setAuthorId($this->uuid($record['authorId']));
        $reaction->setCommunityId($this->uuid($record['communityId']));
        $reaction->setLike((bool)$record['like']);
        $reaction->setCreated($record['created']);
        return $reaction;
    }
}