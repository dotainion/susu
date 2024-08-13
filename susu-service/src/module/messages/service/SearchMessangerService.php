<?php
namespace src\module\messages\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\groups\logic\ListGroups;
use src\module\user\logic\ListUsers;

class SearchMessangerService extends Service{
    protected ListUsers $users;
    protected ListGroups $groups;

    public function __construct(){
        parent::__construct(false);
        $this->users = new ListUsers();
        $this->groups = new ListGroups();
    }
    
    public function process($value){
        Assert::stringNotEmpty($value, 'No results');

        $usersCollector = $this->users->byName($value);
        $groupsCollector = $this->groups->byName($value);

        $this->setOutput($usersCollector);
        $this->setOutput($groupsCollector);
        return $this;
    }
}