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
            ->add('susuId', $this->uuid($link->susuId()))
            ->add('position', $link->position());
        $this->execute();
    }
    
    public function editPosition(SusuLink $link):void{
        $this->insert('susuLink') 
            ->set('position', $link->position())       
            ->where('memberId', $this->uuid($link->memberId()))
            ->where('susuId', $this->uuid($link->susuId()));
        $this->execute();
    }
    
    public function deleteSusu(SusuLink $link):void{
        $this->delete('susuLink')
            ->where('memberId', $this->uuid($link->memberId()))
            ->where('susuId', $this->uuid($link->susuId()));
        $this->execute();
    }
    
    public function listSusuLink(array $where = []):Collector{
        $this->select('susuLink');

        if(isset($where['susuId'])){
            $this->where('susuId', $this->uuid($where['susuId']));
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