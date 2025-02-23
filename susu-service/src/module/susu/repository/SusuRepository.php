<?php
namespace src\module\susu\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\susu\factory\SusuFactory;
use src\module\susu\objects\Susu;

class SusuRepository extends Repository{
    protected SusuFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SusuFactory();
    }
    
    public function create(Susu $susu):void{
        $this->insert('susu')        
            ->column('id', $this->uuid($susu->id()))
            ->column('contribution', $susu->contribution())
            ->column('cycle', $susu->cycle())
            ->column('accurance', $susu->accurance())
            ->column('startDate', $susu->startDate()->toString())
            ->column('communityId', $this->uuid($susu->communityId()))
            ->column('pendingStart', $susu->pendingStart())
            ->column('canceled', $susu->canceled())
            ->column('completed', $susu->completed());
        $this->execute();
    }
    
    public function edit(Susu $susu):void{
        $this->update('susu')     
            ->column('contribution', $susu->contribution())
            ->column('cycle', $susu->cycle())
            ->column('accurance', $susu->accurance())
            ->column('startDate', $susu->startDate()->toString())
            ->column('communityId', $this->uuid($susu->communityId()))
            ->column('pendingStart', $susu->pendingStart())
            ->column('canceled', $susu->canceled())
            ->column('completed', $susu->completed())
            ->where()->eq('id', $this->uuid($susu->id()));
        $this->execute();
    }
    
    public function listSusu(array $where = []):Collector{
        $this->select('susu');

        if(isset($where['communityId'])){
            $this->where()->eq('communityId', $this->uuid($where['communityId']));
        }
        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['completed'])){
            $this->where()->eq('completed', (int)$where['completed']);
        }
        if(isset($where['canceled'])){
            $this->where()->eq('canceled', (int)$where['canceled']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}