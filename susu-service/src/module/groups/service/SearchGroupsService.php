<?php
namespace src\module\groups\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\ListGroups;

class SearchGroupsService extends Service{
    protected ListGroups $groups;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct();
        $this->groups = new ListGroups();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($value){
        $value = trim($value);
        if((new Id())->isValid($value)){
            $collector = $this->groups->byIdArray([new Id($value)]);
        }else{
            $collector = $this->groups->byName($value);
        }

        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}