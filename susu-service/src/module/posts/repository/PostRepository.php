<?php
namespace src\module\posts\repository;

use src\infrastructure\Repository;
use src\module\posts\factory\PostFactory;
use src\module\posts\objects\Post;
use tools\infrastructure\Collector;

class PostRepository extends Repository{
    protected PostFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new PostFactory();
    }
    
    public function create(Post $post):void{
        $this->insert('post')        
            ->column('id', $this->uuid($post->id()))
            ->column('authorId', $this->uuid($post->authorId()))
            ->column('parentId', $this->uuid($post->parentId()))
            ->column('communityId', $this->uuid($post->communityId()))
            ->column('contents', htmlspecialchars($post->contents()))
            ->column('created', $post->created()->toString());
        $this->execute();
    }
    
    public function edit(Post $post):void{
        $this->update('post')
            ->column('authorId', $this->uuid($post->authorId()))
            ->column('parentId', $this->uuid($post->parentId()))
            ->column('communityId', $this->uuid($post->communityId()))
            ->column('contents', htmlspecialchars($post->contents()))
            //->column('created', $post->created()->toString())
            ->where()->eq('id', $this->uuid($post->id()));
        $this->execute();
    }
    
    public function listPosts(array $where = []):Collector{
        $this->select('post');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['parentId'])){
            $this->where()->eq('parentId', $this->uuid($where['parentId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}