<?php
namespace src\module\groups\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\factory\GroupFactory;
use src\module\groups\factory\GroupLinkFactory;
use src\module\groups\objects\Group;

class GroupRepository extends Repository{
    protected GroupFactory $factory;
    protected GroupLinkFactory $linkFactory;

    public function __construct(){
        parent::__construct();
        $this->factory = new GroupFactory();
        $this->linkFactory = new GroupLinkFactory();
    }
    
    public function create(Group $group):void{
        $this->insert('group')        
            ->add('id', $this->uuid($group->id()))
            ->add('name', $group->name())
            ->add('contribution', $group->contribution())
            ->add('description', $group->description())
            ->add('cycle', $group->cycle())
            ->add('payoutDate', $group->payoutDate()->toString())
            ->add('createdDate', $group->createdDate()->toString());
        $this->execute();
    }
    
    public function edit(Group $group):void{
        $this->update('group')     
            ->set('name', $group->name())
            ->set('contribution', $group->contribution())
            ->set('description', $group->description())
            ->set('cycle', $group->cycle())
            ->set('payoutDate', $group->payoutDate()->toString())
            ->set('createdDate', $group->createdDate()->toString())
            ->where('id', $this->uuid($group->id()));
        $this->execute();
    }
    
    public function joinGroup(Id $groupId, Id $memberId):void{
        $this->insert('groupLink')        
            ->add('groupId', $this->uuid($groupId))
            ->add('memberId', $this->uuid($memberId));
        $this->execute();
    }
    
    public function listJoinGroup(?Id $groupId=null, ?Id $memberId=null):Collector{
        $this->insert('groupLink');
        ($groupId !== null) && $this->add('groupId', $this->uuid($groupId));
        ($memberId !== null) && $this->add('memberId', $this->uuid($memberId));
        $this->execute();
        return $this->linkFactory->map(
            $this->results()
        );
    }
    
    public function listGroups(array $where = []):Collector{
        $this->select('group');

        if(isset($where['memberId'])){
            $this->innerJoin('groupLink', 'groupId', 'group', 'id');
            $this->innerJoin('user', 'id', 'groupLink', 'memberId');
            $this->where('id', $this->uuid($where['memberId']), 'user');
        }

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}