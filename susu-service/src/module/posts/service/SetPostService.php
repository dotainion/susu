<?php
namespace src\module\posts\service;

use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\posts\factory\PostFactory;
use src\module\posts\logic\SetPost;

class SetPostService extends Service{
    protected SetPost $save;
    protected PostFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->save = new SetPost();
        $this->factory = new PostFactory();
    }
    
    public function process($id, $parentId, $contents, $communityId){
        Assert::validUuid($communityId, 'Community not found.');
        Assert::stringNotEmpty($contents, 'Content is required for a post.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $post = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'authorId' => $this->user()->id()->toString(),
            'parentId' => $parentId,
            'contents' => $contents,
            'communityId' => $communityId,
            'created' => (new DateHelper())->new()->toString(),
        ]);

        $this->save->set($post);

        $post->setAuthor($this->user());

        $this->setOutput($post);
        return $this;
    }
}