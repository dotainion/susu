<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\FetchGroup;

class FetchGroupService extends Service{
    protected FetchGroup $group;

    public function __construct(){
        parent::__construct();
        $this->group = new FetchGroup();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Group not found.');
        
        $collector = $this->group->group(new Id($id));
        $collector->assertHasItem('Group not found.');
        $this->setOutput($collector);
        
        return $this;
    }
}