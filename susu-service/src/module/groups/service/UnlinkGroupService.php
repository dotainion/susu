<?php
namespace src\module\groups\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\groups\factory\GroupLinkFactory;
use src\module\groups\logic\FetchGroup;
use src\module\groups\logic\UnlinkGroup;

class UnlinkGroupService extends Service{
    protected UnlinkGroup $group;
    protected FetchGroup $fetch;
    protected GroupLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->group = new UnlinkGroup();
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

        $this->group->unlink($link);
        $collector = $this->fetch->group($link->groupId());
        
        $this->setOutput($collector);
        return $this;
    }
}