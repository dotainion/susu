<?php
namespace src\module\groups\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\groups\factory\GroupFactory;
use src\module\groups\factory\GroupLinkFactory;
use src\module\groups\objects\Group;
use src\module\groups\objects\GroupLink;

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
            ->add('createdDate', $group->createdDate()->toString())
            ->add('creatorId', $this->uuid($group->creatorId()));
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
            ->set('creatorId', $this->uuid($group->creatorId()))
            ->where('id', $this->uuid($group->id()));
        $this->execute();
    }
    
    public function joinGroup(GroupLink $link):void{
        $this->insert('groupLink')        
            ->add('groupId', $this->uuid($link->groupId()))
            ->add('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function unlinkGroup(GroupLink $link):void{
        $this->delete('groupLink')        
            ->where('groupId', $this->uuid($link->groupId()))
            ->where('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function listJoinGroup(array $where = []):Collector{
        $this->select('groupLink');
        isset($where['groupId']) && $this->where('groupId', $this->uuid($where['groupId']));
        isset($where['memberId']) && $this->where('memberId', $this->uuid($where['memberId']));
        $this->execute();
        return $this->linkFactory->map(
            $this->results()
        );
    }
    
    public function listGroups(array $where = []):Collector{
        $this->select('group');

        if(isset($where['memberId'])){
            $this->innerJoin('groupLink', 'groupId', 'group', 'id');
            $this->where('memberId', $this->uuid($where['memberId']), 'groupLink');
        }

        if(isset($where['name'])){
            $this->like('name', $where['name']);
        }
        if(isset($where['creatorId'])){
            $this->where('creatorId', $this->uuid($where['creatorId']));
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