<?php
namespace src\module\posts\factory;

use src\module\posts\objects\Post;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class PostFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Post{
        $post = new Post();
        $post->setId($this->uuid($record['id']));
        $post->setParentId($this->uuid($record['parentId']));
        $post->setCommunityId($this->uuid($record['communityId']));
        $post->setAuthorId($this->uuid($record['authorId']));
        $post->setContents($record['contents']);
        $post->setCreated($record['created']);
        return $post;
    }
}