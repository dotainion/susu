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
}