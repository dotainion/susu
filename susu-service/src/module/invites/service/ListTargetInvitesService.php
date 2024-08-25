<?php
namespace src\module\invites\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\invites\logic\AppendGroupToInvites;
use src\module\invites\logic\ListInvites;

class ListTargetInvitesService extends Service{
    protected ListInvites $invites;
    protected AppendGroupToInvites $append;

    public function __construct(){
        parent::__construct(false);
        $this->invites = new ListInvites();
        $this->append = new AppendGroupToInvites();
    }
    
    public function process($targetId){
        Assert::validUuid($targetId, 'Target not found.');

        $collector = $this->invites->byTargetId(new Id($targetId));
        $this->append->appendGroups($collector);

        $this->setOutput($collector);
        return $this;
    }
}