<?php
namespace src\module\invites\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\invites\repository\InviteRepository;

class ListInvites{
    protected InviteRepository $repo;

    public function __construct(){
        $this->repo = new InviteRepository();
    }

    public function byMemberId(Id $memberId):Collector{
        return $this->repo->listInvite([
            'memberId' => $memberId
        ]);
    }

    public function byTargetId(Id $targetId):Collector{
        return $this->repo->listInvite([
            'targetId' => $targetId
        ]);
    }
}