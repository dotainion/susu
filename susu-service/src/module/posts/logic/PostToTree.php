<?php
namespace src\module\posts\logic;

use src\module\user\logic\ListUsers;
use tools\infrastructure\Collector;

class PostToTree{
    protected ListUsers $users;
    protected ListReaction $reactions;

    public function __construct(){
        $this->users = new ListUsers();
        $this->reactions = new ListReaction();
    }
    
    public function buildPostTree(Collector $collector): Collector {
        $postMap = [];
        $roots = new Collector();

        $users = $this->users->usersByIdArray($collector->attrArray('authorId'));
        $reactions = $this->reactions->byCommunityId($collector->first()->communityId());
    
        foreach ($collector->list() as $post) {
            $postMap[$post->id()->toString()] = $post;
            $post->setContents(htmlspecialchars_decode($post->contents()));
            $authors = $users->filter('id', $post->authorId()->toString());
            $authors->hasItem() && $post->setAuthor($authors->first());
            $authorFilter =  $reactions->filter('authorId', $post->authorId()->toString());
            $targetFilter = $authorFilter->filter('targetId', $post->id()->toString());
            $post->likes()->mergeCollection($targetFilter);
        }
    
        foreach ($collector->list() as $post) {
            $parentId = $post->parentId()?->toString();
    
            if ($parentId && isset($postMap[$parentId])) {
                $parent = $postMap[$parentId];
                $parent->replies()->add($post);
            } else {
                $roots->add($post);
            }
        }
    
        return $roots;
    }
}