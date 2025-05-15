<?php
namespace src\module\posts\logic;

use src\module\posts\objects\Post;
use src\module\posts\repository\PostRepository;

class SetPost{
    protected PostRepository $repo;

    public function __construct(){
        $this->repo = new PostRepository();
    }

    public function set(Post $post):void{
        $collector = $this->repo->listPosts([
            'id' => $post->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($post);
            return;
        }
        $this->repo->edit($post);
    }
}