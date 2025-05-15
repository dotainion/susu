<?php
namespace src\module\posts\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\posts\logic\ListPost;
use src\module\posts\logic\PostToTree;

class ListPostService extends Service{
    protected ListPost $pots;
    protected PostToTree $tree;

    public function __construct(){
        parent::__construct();
        $this->pots = new ListPost();
        $this->tree = new PostToTree();
    }
    
    public function process($communityId){
        Assert::validUuid($communityId, 'Community not found.');

        $collector = $this->pots->byCommunityId(new Id($communityId));

        $collectorTree = $this->tree->buildPostTree($collector);

        $this->setOutput($collectorTree);
        return $this;
    }
}