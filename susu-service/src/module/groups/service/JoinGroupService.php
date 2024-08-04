<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\factory\GroupLinkFactory;
use src\module\groups\logic\FetchGroup;
use src\module\groups\logic\JoinGroup;

class JoinGroupService extends Service{
    protected JoinGroup $group;
    protected FetchGroup $fetch;
    protected GroupLinkFactory $factory;

    public function __construct(){
        parent::__construct(false);
        $this->group = new JoinGroup();
        $this->fetch = new FetchGroup();
        $this->factory = new GroupLinkFactory();
    }
    
    public function process($groupId, $memberId){
        Assert::validUuid($groupId, 'Group not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $link = $this->factory->mapResult([
            'groupId' => $groupId,
            'memberId' => $memberId,
        ]);

        $this->group->join($link);
        $collector = $this->fetch->group($link->groupId());

        $this->setOutput($collector);
        return $this;
    }
}