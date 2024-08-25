<?php
namespace src\module\invites\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\invites\logic\AppendGroupToInvites;
use src\module\invites\logic\ListInvites;

class ListMemberInvitesService extends Service{
    protected ListInvites $invites;
    protected AppendGroupToInvites $append;

    public function __construct(){
        parent::__construct(false);
        $this->invites = new ListInvites();
        $this->append = new AppendGroupToInvites();
    }
    
    public function process($memberId){
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->invites->byMemberId(new Id($memberId));
        $this->append->appendGroups($collector);

        $this->setOutput($collector);
        return $this;
    }
}