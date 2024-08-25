<?php
namespace src\module\invites\logic;

use src\infrastructure\Collector;
use src\module\groups\logic\ListGroups;
use src\module\invites\objects\Invite;
use src\module\susu\logic\ListSusu;

class AppendGroupToInvites{
    protected ListSusu $susu;
    protected ListGroups $groups;

    public function __construct(){
        $this->susu = new ListSusu();
        $this->groups = new ListGroups();
    }

    public function appendGroups(Collector &$collector):void{
        $targetIdArray = $collector->attrArray('targetId');
        $susus = $this->susu->byIdArray($targetIdArray);
        $targetIdArray = [...$targetIdArray, ...$susus->attrArray('groupId')];

        $references = [];
        foreach($susus->list() as $susu){
            $references[$susu->id()->toString()] = $susu->groupId()->toString();
        }

        $groups = $this->groups->byIdArray($targetIdArray);
        
        foreach($collector->list() as $invite){
            foreach($groups->list() as $group){
                $ref = $references[$invite->targetId()->toString()] ?? null;
                if($invite->targetId()->toString() === $group->id()->toString() || $ref === $group->id()->toString()){
                    $invite->setGroup($group);
                }
            }
        }
    }

    public function appendGroup(Invite $invite):void{
        $collector = new Collector();
        $collector->add($invite);
        $this->appendGroups($collector);
    }
}