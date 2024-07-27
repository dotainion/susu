<?php
namespace src\module\groups\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\factory\GroupFactory;
use src\module\groups\logic\JoinGroup;
use src\module\groups\logic\SetGroup;
use src\module\susu\logic\FetchSusu;

class SetGroupService extends Service{
    protected GroupFactory $factory;
    protected SetGroup $group;
    protected JoinGroup $join;
    protected FetchSusu $susu;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new GroupFactory();
        $this->group = new SetGroup();
        $this->join = new JoinGroup();
        $this->susu = new FetchSusu();
    }
    
    public function process($id, $name, $contribution, $description, $cycle, $payoutDate, $hide){
        $idObj = new Id();
        $groupId = $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $collector = $this->susu->activeByGroupId($groupId);
        $collector->assertItemNotExist('Cannot edit group when susu is active.');

        $group = $this->factory->mapResult([
            'id' => $groupId->toString(),
            'name' => $name,
            'contribution' => $contribution,
            'description' => $description,
            'cycle' => $cycle,
            'payoutDate' => $payoutDate,
            'createdDate' => (new DateHelper())->new()->toString(),
            'creatorId' => $this->user()->id()->toString(),
            'hide' => $hide
        ]);

        $this->group->set($group);
        $this->join->join($group->id(), $this->user()->id());

        $this->setOutput($group);
        
        return $this;
    }
}