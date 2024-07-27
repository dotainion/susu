<?php
namespace src\module\groups\logic;

use src\infrastructure\Collector;
use src\module\groups\repository\GroupRepository;

class BindMembersToGroups{
    protected GroupRepository $repo;

    public function __construct(){
        $this->repo = new GroupRepository();
    }

    public function bind(Collector &$groups, Collector $members, Collector $links):void{
        foreach($groups->list() as $group){
            $membersIdArray = [];
            $memberCollector = new Collector();
            foreach($links->list() as $link){
                if($link->groupId()->toString() === $group->id()->toString()){
                    $membersIdArray[] = $link->memberId()->toString();
                }
            }
            foreach($members->list() as $member){
                if(in_array($member->id()->toString(), $membersIdArray)){
                    $memberCollector->add($member);
                }
            }
            if($memberCollector->hasItem()){
                $group->setMembers($memberCollector);
            }
        }
    }
}