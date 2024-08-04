<?php
namespace src\module\susu\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\susu\factory\SusuFactory;
use src\module\susu\objects\Susu;
use src\module\susu\objects\SusuLink;

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
            ->add('payoutDate', $susu->payoutDate()->toString())
            ->add('startDate', $susu->startDate()->toString())
            ->add('groupId', $this->uuid($susu->groupId()))
            ->add('pendingStart', $susu->pendingStart())
            ->add('canceled', $susu->canceled())
            ->add('completed', $susu->completed());
        $this->execute();
    }
    
    public function edit(Susu $susu):void{
        $this->update('susu')     
            ->set('contribution', $susu->contribution())
            ->set('cycle', $susu->cycle())
            ->set('payoutDate', $susu->payoutDate()->toString())
            ->set('startDate', $susu->startDate()->toString())
            ->set('groupId', $this->uuid($susu->groupId()))
            ->set('pendingStart', $susu->pendingStart())
            ->set('canceled', $susu->canceled())
            ->set('completed', $susu->completed())
            ->where('id', $this->uuid($susu->id()));
        $this->execute();
    }
    
    public function listSusu(array $where = []):Collector{
        $this->select('susu');

        if(isset($where['groupId'])){
            $this->where('groupId', $this->uuid($where['groupId']));
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