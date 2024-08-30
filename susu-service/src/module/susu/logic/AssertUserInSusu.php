<?php
namespace src\module\susu\logic;

use InvalidArgumentException;
use src\infrastructure\Id;

class AssertUserInSusu{
    protected FetchSusuLink $link;

    public function __construct(){
        $this->link = new FetchSusuLink();
    }

    public function assertUserInSusu(Id $memberId, Id $susuId):bool{
        $links = $this->link->link($susuId, $memberId);
        if(!$links->hasItem()){
            throw new InvalidArgumentException('Member must first join susu.');
        }
        return true;
    }

    public function assertUserInSusuByMemberIdArray(array $memberIdArray, array $susuIdArray):bool{
        $links = $this->link->linkByIdArray($susuIdArray, $memberIdArray);
        if($links->count() !== count($memberIdArray)){
            throw new InvalidArgumentException('One or more members must first join the susu.');
        }
        return true;
    }
}