<?php
namespace src\module\invites\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\invites\repository\InviteRepository;

class FetchInvite{
    protected InviteRepository $repo;

    public function __construct(){
        $this->repo = new InviteRepository();
    }

    public function byId(Id $id):Collector{
        return $this->repo->listInvite([
            'id' => $id
        ]);
    }
}