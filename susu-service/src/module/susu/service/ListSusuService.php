<?php
namespace src\module\susu\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;

class ListSusuService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;

    public function __construct(){
        parent::__construct();
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
    }
    
    public function process($memberId, $communityId){
        if($memberId && $communityId){
            throw new InvalidArgumentException('Must use either memberId or communityId not both.');
        }
        if(!$memberId && !$communityId){
            throw new InvalidArgumentException('Must pass either memberId or communityId.');
        }
        $memberId && Assert::validUuid($memberId, 'Member not found.');
        $communityId && Assert::validUuid($communityId, 'Susu not found.');

        if($communityId){
            $collector = $this->susu->byCommunityId(new Id($communityId));
        }else if($memberId){
            $linkCollector = $this->links->byMemberId(new Id($memberId));
            $collector = $this->susu->byIdArray($linkCollector->attrArray('susuId'));
        }

        $collector->assertHasItem('No active susu found.');

        $this->setOutput($collector);
        return $this;
    }
}