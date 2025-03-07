<?php
namespace src\module\communities\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\communities\factory\CommunityFactory;
use src\module\communities\factory\CommunityLinkFactory;
use src\module\communities\objects\Community;
use src\module\communities\objects\CommunityLink;

class CommunityRepository extends Repository{
    protected CommunityFactory $factory;
    protected CommunityLinkFactory $linkFactory;

    public function __construct(){
        parent::__construct();
        $this->factory = new CommunityFactory();
        $this->linkFactory = new CommunityLinkFactory();
    }
    
    public function create(Community $community):void{
        $this->insert('community')        
            ->column('id', $this->uuid($community->id()))
            ->column('name', $community->name())
            ->column('description', $community->description())
            ->column('createdDate', $community->createdDate()->toString())
            ->column('creatorId', $this->uuid($community->creatorId()))
            ->column('privacy', $community->privacy());
        $this->execute();
    }
    
    public function edit(Community $community):void{
        $this->update('community')     
            ->column('name', $community->name())
            ->column('description', $community->description())
            //->column('createdDate', $community->createdDate()->toString())
            //->column('creatorId', $this->uuid($community->creatorId()))
            ->column('privacy', $community->privacy())
            ->where()->eq('id', $this->uuid($community->id()));
        $this->execute();
    }
    
    public function joinCommunity(CommunityLink $link):void{
        $this->insert('communityLink')        
            ->column('communityId', $this->uuid($link->communityId()))
            ->column('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function unlinkCommunity(CommunityLink $link):void{
        $this->delete('communityLink')        
            ->where()
            ->eq('communityId', $this->uuid($link->communityId()))
            ->eq('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function listJoinCommunity(array $where = []):Collector{
        $this->select('communityLink');
        isset($where['communityId']) && $this->where()->eq('communityId', $this->uuid($where['communityId']));
        isset($where['memberId']) && $this->where()->eq('memberId', $this->uuid($where['memberId']));
        $this->execute();
        return $this->linkFactory->map(
            $this->results()
        );
    }
    
    public function listCommunities(array $where = []):Collector{
        $this->select('community');

        if(isset($where['memberId'])){
            $this->join()->inner('communityLink', 'communityId', 'community', 'id');
            $this->where()->eq('memberId', $this->uuid($where['memberId']), 'communityLink');
        }
        if(isset($where['privacy'])){
            $this->where()->eq('privacy', $where['privacy']);
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        if(isset($where['creatorId'])){
            $this->where()->eq('creatorId', $this->uuid($where['creatorId']));
        }
        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['hide'])){
            $this->where()->eq('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}