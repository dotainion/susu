<?php
namespace src\module\susu\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;

class SusuLink{
    protected Id $groupId;
    protected Id $memberId;
    protected ?int $position = null;

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

    public function position():?int{
        return $this->position;
    }

    public function setGroupId(string $groupId):void{
        $this->groupId->set($groupId);
    }

    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }

    public function setPosition(?int $position):void{
        if($position === 0 || $position === null){
            return;
        }
        $this->position = $position;
    }
}