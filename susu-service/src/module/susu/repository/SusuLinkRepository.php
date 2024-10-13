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
            ->column('memberId', $this->uuid($link->memberId()))
            ->column('susuId', $this->uuid($link->susuId()))
            ->column('position', $link->position());
        $this->execute();
    }
    
    public function editPosition(SusuLink $link):void{
        $this->insert('susuLink') 
            ->column('position', $link->position())       
            ->where()
            ->eq('memberId', $this->uuid($link->memberId()))
            ->eq('susuId', $this->uuid($link->susuId()));
        $this->execute();
    }
    
    public function deleteSusu(SusuLink $link):void{
        $this->delete('susuLink')
            ->where()
            ->eq('memberId', $this->uuid($link->memberId()))
            ->eq('susuId', $this->uuid($link->susuId()));
        $this->execute();
    }
    
    public function listSusuLink(array $where = []):Collector{
        $this->select('susuLink');

        if(isset($where['susuId'])){
            $this->where()->eq('susuId', $this->uuid($where['susuId']));
        }
        if(isset($where['memberId'])){
            $this->where()->eq('memberId', $this->uuid($where['memberId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}