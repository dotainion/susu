<?php
namespace src\module\invites\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\invites\logic\AppendGroupToInvites;
use src\module\invites\logic\DeleteInvite;
use src\module\invites\logic\FetchInvite;

class DeleteInviteService extends Service{
    protected DeleteInvite $invite;
    protected FetchInvite $fetch;
    protected AppendGroupToInvites $append;

    public function __construct(){
        parent::__construct(false);
        $this->invite = new DeleteInvite();
        $this->fetch = new FetchInvite();
        $this->append = new AppendGroupToInvites();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Invite not found.');

        $collector = $this->fetch->byId(new Id($id));
        $collector->assertHasItem('Invite not found.');
        $invite = $collector->first();

        $this->invite->delete($invite->id());
        $this->append->appendGroup($invite);

        $this->setOutput($invite);
        return $this;
    }
}