<?php
namespace src\module\communities\repository;

use src\database\Repository;
use src\infrastructure\Collector;
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
            ->add('id', $this->uuid($community->id()))
            ->add('name', $community->name())
            ->add('description', $community->description())
            ->add('createdDate', $community->createdDate()->toString())
            ->add('creatorId', $this->uuid($community->creatorId()));
        $this->execute();
    }
    
    public function edit(Community $community):void{
        $this->update('community')     
            ->set('name', $community->name())
            ->set('description', $community->description())
            ->set('createdDate', $community->createdDate()->toString())
            ->set('creatorId', $this->uuid($community->creatorId()))
            ->where('id', $this->uuid($community->id()));
        $this->execute();
    }
    
    public function joinCommunity(CommunityLink $link):void{
        $this->insert('communityLink')        
            ->add('communityId', $this->uuid($link->communityId()))
            ->add('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function unlinkCommunity(CommunityLink $link):void{
        $this->delete('communityLink')        
            ->where('communityId', $this->uuid($link->communityId()))
            ->where('memberId', $this->uuid($link->memberId()));
        $this->execute();
    }
    
    public function listJoinCommunity(array $where = []):Collector{
        $this->select('communityLink');
        isset($where['communityId']) && $this->where('communityId', $this->uuid($where['communityId']));
        isset($where['memberId']) && $this->where('memberId', $this->uuid($where['memberId']));
        $this->execute();
        return $this->linkFactory->map(
            $this->results()
        );
    }
    
    public function listCommunities(array $where = []):Collector{
        $this->select('community');

        if(isset($where['memberId'])){
            $this->innerJoin('communityLink', 'communityId', 'community', 'id');
            $this->where('memberId', $this->uuid($where['memberId']), 'communityLink');
        }

        if(isset($where['name'])){
            $this->like('name', $where['name']);
        }
        if(isset($where['creatorId'])){
            $this->where('creatorId', $this->uuid($where['creatorId']));
        }
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}