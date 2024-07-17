<?php
namespace src\module\groups\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\groups\factory\GroupFactory;
use src\module\groups\logic\SetGroup;

class SetGroupService extends Service{
    protected GroupFactory $factory;
    protected SetGroup $group;

    public function __construct(){
        parent::__construct();
        $this->factory = new GroupFactory();
        $this->group = new SetGroup();
    }
    
    public function process($id, $name, $contribution, $description, $cycle, $payoutDate, $createdDate, $hide){
        $idObj = new Id();
        $group = $this->factory->mapResult([
            'id' => $idObj->isValid($id) ? $idObj->set($id) : $idObj->new(),
            'name' => $name,
            'contribution' => $contribution,
            'description' => $description,
            'cycle' => $cycle,
            'payoutDate' => $payoutDate,
            'createdDate' => $createdDate,
            'hide' => $hide
        ]);

        $this->group->set($group);
        $this->setOutput($group);
        
        return $this;
    }
}