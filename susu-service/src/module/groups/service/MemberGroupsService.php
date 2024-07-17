<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\ListGroups;

class MemberGroupsService extends Service{
    protected ListGroups $groups;

    public function __construct(){
        parent::__construct(false);
        $this->groups = new ListGroups();
    }
    
    public function process($memberId){
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->groups->memberGroups(new Id($memberId));
        $this->setOutput($collector);
        return $this;
    }
}