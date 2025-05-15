<?php
namespace src\module\susu\logic;

use InvalidArgumentException;
use tools\infrastructure\Id;

class AssertUserInSusu{
    protected FetchSusuLink $link;

    public function __construct(){
        $this->link = new FetchSusuLink();
    }

    public function assertUserInSusu(Id $memberId, Id $susuId, string $message='Member must first join susu.'):bool{
        $links = $this->link->link($susuId, $memberId);
        if(!$links->hasItem()){
            throw new InvalidArgumentException($message);
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