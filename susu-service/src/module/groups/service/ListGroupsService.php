<?php
namespace src\module\groups\service;

use src\infrastructure\Service;
use src\module\groups\logic\ListGroups;

class ListGroupsService extends Service{
    protected ListGroups $groups;

    public function __construct(){
        parent::__construct(false);
        $this->groups = new ListGroups();
    }
    
    public function process(){
        $collector = $this->groups->groups();
        $this->setOutput($collector);
        return $this;
    }
}