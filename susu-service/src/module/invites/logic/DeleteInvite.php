<?php
namespace src\module\invites\logic;

use src\infrastructure\Id;
use src\module\invites\repository\InviteRepository;

class DeleteInvite{
    protected InviteRepository $repo;

    public function __construct(){
        $this->repo = new InviteRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteInvite($id);
    }
}