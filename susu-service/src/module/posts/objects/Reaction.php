<?php
namespace src\module\posts\objects;

use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Reaction implements IObjects{
    protected Id $authorId;
    protected Id $targetId;//community or post
    protected Id $communityId;
    protected bool $like;
    protected DateHelper $created;

    public function __construct(){
        $this->authorId = new Id();
        $this->targetId = new Id();
        $this->communityId = new Id();
        $this->created = new DateHelper();
    }

    public function id():IId{
        return $this->targetId;
    }

    public function authorId():IId{
        return $this->authorId;
    }

    public function targetId():IId{
        return $this->id();
    }

    public function like():bool{
        return $this->like;
    }

    public function dislike():bool{
        return !$this->like();
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function communityId():IId{
        return $this->communityId;
    }

    public function setId(string $targetId):void{
        $this->targetId->set($targetId);
    }

    public function setAuthorId(string $authorId):void{
        $this->authorId->set($authorId);
    }

    public function setLike(bool $like):void{
        $this->like = $like;
    }

    public function setCreated(string $created):void{
        $this->created->set($created);
    }

    public function setCommunityId(string $communityId):void{
        $this->communityId->set($communityId);
    }
}