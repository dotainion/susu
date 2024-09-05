<?php
namespace src\module\communities\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;

class CommunityLink{
    protected Id $communityId;
    protected Id $memberId;

    public function __construct(){
        $this->communityId = new Id();
        $this->memberId = new Id();
    }

    public function communityId():IId{
        return $this->communityId;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function setCommunityId(string $communityId):void{
        $this->communityId->set($communityId);
    }
    
    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }
}