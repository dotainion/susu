<?php
namespace src\module\posts\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;
use tools\infrastructure\IUser;

class Post implements IObjects{
    protected Id $id;
    protected Id $authorId;
    protected ?Id $parentId=null;
    protected Id $communityId;
    protected string $contents;
    protected DateHelper $created;
    protected Collector $replies;
    protected IUser $author;
    protected Collector $likes;

    public function __construct(){
        $this->id = new Id();
        $this->replies = new Collector();
        $this->authorId = new Id();
        $this->communityId = new Id();
        $this->created = new DateHelper();
        $this->likes = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function authorId():IId{
        return $this->authorId;
    }

    public function parentId():?IId{
        return $this->parentId;
    }

    public function communityId():IId{
        return $this->communityId;
    }

    public function contents():string{
        return $this->contents;
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function replies():Collector{
        return $this->replies;
    }

    public function author():IUser{
        return $this->author;
    }

    public function likes():Collector{
        return $this->likes;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setAuthorId(string $authorId):void{
        $this->authorId->set($authorId);
    }

    public function setParentId(?string $parentId):void{
        if($parentId === null){
            return;
        }
        $this->parentId = new Id($parentId);
    }

    public function setCommunityId(string $communityId):void{
        $this->communityId->set($communityId);
    }

    public function setContents(string $contents):void{
        $this->contents = $contents;
    }

    public function setCreated(string $created):void{
        $this->created->set($created);
    }

    public function setAuthor(IUser $author):void{
        $this->author = $author;
    }
}