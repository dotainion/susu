<?php
namespace src\module\invites\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\invites\factory\InviteFactory;
use src\module\invites\logic\AppendCommunityToInvites;
use src\module\invites\logic\SetInvite;

class SetInviteService extends Service{
    protected SetInvite $save;
    protected InviteFactory $factory;
    protected AppendCommunityToInvites $append;

    public function __construct(){
        parent::__construct();
        $this->save = new SetInvite();
        $this->factory = new InviteFactory();
        $this->append = new AppendCommunityToInvites();
    }
    
    public function process($id, $memberId, $targetId, $isSusu){
        Assert::validUuid($memberId, 'Member not found.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $invite = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'memberId' => $memberId,
            'targetId' => $targetId,
            'date' => (new DateHelper())->new()->toString(),
            'expire' => (new DateHelper())->new()->toString(),
            'isSusu' => $isSusu
        ]);

        $this->save->set($invite);
        $this->append->appendCommunity($invite);

        $this->setOutput($invite);
        return $this;
    }
}