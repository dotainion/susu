<?php
namespace src\module\susu\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\susu\factory\SusuLinkFactory;
use src\module\susu\objects\SusuLink;

class SusuLinkRepository extends Repository{
    protected SusuLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SusuLinkFactory();
    }
    
    public function create(SusuLink $link):void{
        $this->insert('susuLink')        
            ->add('memberId', $this->uuid($link->memberId()))
            ->add('groupId', $this->uuid($link->groupId()))
            ->add('position', $link->position());
        $this->execute();
    }
    
    public function editPosition(SusuLink $link):void{
        $this->insert('susuLink') 
            ->set('position', $link->position())       
            ->where('memberId', $this->uuid($link->memberId()))
            ->where('groupId', $this->uuid($link->groupId()));
        $this->execute();
    }
    
    public function deleteSusu(SusuLink $link):void{
        $this->delete('susuLink')
            ->where('memberId', $this->uuid($link->memberId()))
            ->where('groupId', $this->uuid($link->groupId()));
        $this->execute();
    }
    
    public function listSusuLink(array $where = []):Collector{
        $this->select('susuLink');

        if(isset($where['groupId'])){
            $this->where('groupId', $this->uuid($where['groupId']));
        }
        if(isset($where['memberId'])){
            $this->where('memberId', $this->uuid($where['memberId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}