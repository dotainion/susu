<?php
namespace src\module\susu\repository;

use src\database\Repository;
use src\infrastructure\Collector;
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
            ->add('id', $this->uuid($susu->id()))
            ->add('contribution', $susu->contribution())
            ->add('cycle', $susu->cycle())
            ->add('accurance', $susu->accurance())
            ->add('startDate', $susu->startDate()->toString())
            ->add('communityId', $this->uuid($susu->communityId()))
            ->add('pendingStart', $susu->pendingStart())
            ->add('canceled', $susu->canceled())
            ->add('completed', $susu->completed());
        $this->execute();
    }
    
    public function edit(Susu $susu):void{
        $this->update('susu')     
            ->set('contribution', $susu->contribution())
            ->set('cycle', $susu->cycle())
            ->set('accurance', $susu->accurance())
            ->set('startDate', $susu->startDate()->toString())
            ->set('communityId', $this->uuid($susu->communityId()))
            ->set('pendingStart', $susu->pendingStart())
            ->set('canceled', $susu->canceled())
            ->set('completed', $susu->completed())
            ->where('id', $this->uuid($susu->id()));
        $this->execute();
    }
    
    public function listSusu(array $where = []):Collector{
        $this->select('susu');

        if(isset($where['communityId'])){
            $this->where('communityId', $this->uuid($where['communityId']));
        }
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['completed'])){
            $this->where('completed', (int)$where['completed']);
        }
        if(isset($where['canceled'])){
            $this->where('canceled', (int)$where['canceled']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}