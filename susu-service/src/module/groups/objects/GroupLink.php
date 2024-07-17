<?php
namespace src\module\groups\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;

class GroupLink{
    protected Id $groupId;
    protected Id $memberId;

    public function __construct(){
        $this->groupId = new Id();
        $this->memberId = new Id();
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function setGroupId(string $groupId):void{
        $this->groupId->set($groupId);
    }
    
    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }
}