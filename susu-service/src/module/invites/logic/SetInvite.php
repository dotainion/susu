<?php
namespace src\module\invites\logic;

use src\module\invites\objects\Invite;
use src\module\invites\repository\InviteRepository;

class SetInvite{
    protected InviteRepository $repo;

    public function __construct(){
        $this->repo = new InviteRepository();
    }

    public function set(Invite $invite):void{
        $collector = $this->repo->listInvite([
            'targetId' => $invite->targetId(),
            'memberId' => $invite->memberId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->create($invite);
    }
}