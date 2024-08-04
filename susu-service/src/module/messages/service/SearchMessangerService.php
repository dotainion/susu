<?php
namespace src\module\messages\service;

use src\infrastructure\Collector;
use src\infrastructure\Service;
use src\module\groups\logic\ListGroups;
use src\module\user\logic\ListUsers;
use src\module\user\objects\User;

class SearchMessangerService extends Service{
    protected ListUsers $users;
    protected ListGroups $groups;

    public function __construct(){
        parent::__construct(false);
        $this->users = new ListUsers();
        $this->groups = new ListGroups();
    }
    
    public function process($value){
        $usersCollector = $this->users->byName($value);
        $groupsCollector = $this->groups->byName($value);

        $mergedArray = array_merge($usersCollector->list(), $groupsCollector->list());

        usort($mergedArray, function($a, $b) {
            if($a instanceof User){
                return strcmp($a->firstName(), $b->firstName());
            }
            return strcmp($a->name(), $b->name());
        });

        $collector = new Collector();
        array_map(fn($obj)=>$collector->add($obj), $mergedArray);

        $this->setOutput($collector);
        return $this;
    }
}