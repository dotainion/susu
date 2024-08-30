<?php
namespace src\module\groups\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\factory\GroupFactory;
use src\module\groups\factory\GroupLinkFactory;
use src\module\groups\logic\BindMembersToGroups;
use src\module\groups\logic\JoinGroup;
use src\module\groups\logic\SetGroup;

class SetGroupService extends Service{
    protected GroupFactory $factory;
    protected GroupLinkFactory $linkFactory;
    protected SetGroup $group;
    protected JoinGroup $join;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct();
        $this->factory = new GroupFactory();
        $this->linkFactory = new GroupLinkFactory();
        $this->group = new SetGroup();
        $this->join = new JoinGroup();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($id, $name, $description, $cycle, $hide){
        $idObj = new Id();
        $groupId = $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $collector = $this->factory->map([[
            'id' => $groupId->toString(),
            'name' => $name,
            'description' => $description,
            'cycle' => $cycle,
            'createdDate' => (new DateHelper())->new()->toString(),
            'creatorId' => $this->user()->id()->toString(),
            'hide' => $hide
        ]]);
        $group = $collector->first();

        $link = $this->linkFactory->mapResult([
            'groupId' => $group->id()->toString(),
            'memberId' => $this->user()->id()->toString(),
        ]);

        $this->group->set($group);
        $this->join->join($link);

        $this->bind->bindRequirements($collector);

        $this->setOutput($collector);
        return $this;
    }
}