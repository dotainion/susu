<?php
namespace src\module\invites\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\factory\CommunityLinkFactory;
use src\module\communities\logic\FetchCommunity;
use src\module\communities\logic\JoinCommunity;
use src\module\communities\logic\ListCommunityLinks;
use src\module\invites\factory\InviteFactory;
use src\module\invites\logic\AppendCommunityToInvites;
use src\module\invites\logic\SetInvite;
use src\module\susu\logic\FetchSusu;

class SetInviteService extends Service{
    protected SetInvite $save;
    protected InviteFactory $factory;
    protected AppendCommunityToInvites $append;
    protected FetchSusu $susu;
    protected JoinCommunity $community;
    protected CommunityLinkFactory $communityLinkfactory;
    protected ListCommunityLinks $listCommunityLink;

    public function __construct(){
        parent::__construct();
        $this->save = new SetInvite();
        $this->factory = new InviteFactory();
        $this->append = new AppendCommunityToInvites();
        $this->susu = new FetchSusu();
        $this->community = new JoinCommunity();
        $this->communityLinkfactory = new CommunityLinkFactory();
        $this->listCommunityLink = new ListCommunityLinks();
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
            'expire' => (new DateHelper())->new()->addDays(14)->toString(),
            'isSusu' => $isSusu,
        ]);

        if($invite->isSusu()){
            $collector = $this->susu->activeById($invite->targetId());
            $collector->assertHasItem('The susu does not appear to have started yet.');
            $susu = $collector->first();
            if(!$susu->pendingStart()){
                throw new InvalidArgumentException('You cannot send an invite on a susu that has already been activated.');
            }
            $communityLink = $this->communityLinkfactory->mapResult([
                'communityId' => $susu->communityId()->toString(),
                'memberId' => $invite->memberId()->toString(),
            ]);
            $this->community->join($communityLink);
            $collector = $this->listCommunityLink->byMemberId($invite->memberId());
            if($collector->hasItem()){
                $invite->setIsGroupMember(true);
            }
        }

        $this->save->set($invite);
        $this->append->appendCommunity($invite);

        $this->setOutput($invite);
        return $this;
    }
}