<?php
namespace src\module\messages\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\communities\logic\ListCommunities;
use src\module\user\logic\ListUsers;

class SearchMessangerService extends Service{
    protected ListUsers $users;
    protected ListCommunities $communities;

    public function __construct(){
        parent::__construct();
        $this->users = new ListUsers();
        $this->communities = new ListCommunities();
    }
    
    public function process($value){
        Assert::stringNotEmpty($value, 'No results');

        $usersCollector = $this->users->byName($value);
        $communitiesCollector = $this->communities->byName($value);

        $this->setOutput($usersCollector);
        $this->setOutput($communitiesCollector);
        return $this;
    }
}