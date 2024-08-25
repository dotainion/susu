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
use src\module\susu\logic\FetchSusu;

class SetGroupService extends Service{
    protected GroupFactory $factory;
    protected GroupLinkFactory $linkFactory;
    protected SetGroup $group;
    protected JoinGroup $join;
    protected FetchSusu $susu;
    protected BindMembersToGroups $bind;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new GroupFactory();
        $this->linkFactory = new GroupLinkFactory();
        $this->group = new SetGroup();
        $this->join = new JoinGroup();
        $this->susu = new FetchSusu();
        $this->bind = new BindMembersToGroups();
    }
    
    public function process($id, $name, $description, $cycle, $hide){
        $idObj = new Id();
        $groupId = $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $collector = $this->susu->activeByGroupId($groupId);
        $collector->assertItemNotExist('Cannot edit group when susu is active.');

        $groupCollector = $this->factory->map([[
            'id' => $groupId->toString(),
            'name' => $name,
            'description' => $description,
            'cycle' => $cycle,
            'createdDate' => (new DateHelper())->new()->toString(),
            'creatorId' => $this->user()->id()->toString(),
            'hide' => $hide
        ]]);
        $group = $groupCollector->first();

        $link = $this->linkFactory->mapResult([
            'groupId' => $group->id()->toString(),
            'memberId' => $this->user()->id()->toString(),
        ]);

        $this->group->set($group);
        $this->join->join($link);

        $this->bind->bindRequirements($groupCollector);

        $this->setOutput($groupCollector);
        return $this;
    }
}