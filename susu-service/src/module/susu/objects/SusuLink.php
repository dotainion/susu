<?php
namespace src\module\susu\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;

class SusuLink{
    protected Id $susuId;
    protected Id $memberId;
    protected ?int $position = null;

    public function __construct(){
        $this->susuId = new Id();
        $this->memberId = new Id();
    }

    public function susuId():IId{
        return $this->susuId;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function position():?int{
        return $this->position;
    }

    public function setSusuId(string $susuId):void{
        $this->susuId->set($susuId);
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