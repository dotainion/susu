<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\logic\FetchGroup;
use src\module\groups\logic\JoinGroup;

class JoinGroupService extends Service{
    protected JoinGroup $group;
    protected FetchGroup $fetch;

    public function __construct(){
        parent::__construct(false);
        $this->group = new JoinGroup();
        $this->fetch = new FetchGroup();
    }
    
    public function process($groupId, $memberId){
        Assert::validUuid($groupId, 'Group not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $this->group->join(new Id($groupId), new Id($memberId));
        $collector = $this->fetch->group(new Id($groupId));
        $this->setOutput($collector);

        return $this;
    }
}