<?php
namespace src\module\invites\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\invites\logic\AppendCommunityToInvites;
use src\module\invites\logic\ListInvites;

class ListTargetInvitesService extends Service{
    protected ListInvites $invites;
    protected AppendCommunityToInvites $append;

    public function __construct(){
        parent::__construct();
        $this->invites = new ListInvites();
        $this->append = new AppendCommunityToInvites();
    }
    
    public function process($targetId){
        Assert::validUuid($targetId, 'Target not found.');

        $collector = $this->invites->byTargetId(new Id($targetId));
        $this->append->appendCommunities($collector);

        $this->setOutput($collector);
        return $this;
    }
}