<?php
namespace src\module\refund\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\refund\factory\RefundFactory;
use src\module\refund\objects\Refund;

class RefundRepository extends Repository{
    protected RefundFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new RefundFactory();
    }
    
    public function create(Refund $refund):void{
        $this->insert('refund')        
            ->add('id', $this->uuid($refund->id()))
            ->add('susuId', $this->uuid($refund->susuId()))
            ->add('memberId', $this->uuid($refund->memberId()))
            ->add('date', $refund->date()->toString())
            ->add('amount', $refund->amount())
            ->add('contributionId', $refund->contributionId())
            ->add('description', $refund->description());
        $this->execute();
    }
    
    public function edit(Refund $refund):void{
        $this->insert('refund') 
            ->set('susuId', $this->uuid($refund->susuId()))  
            ->set('memberId', $this->uuid($refund->memberId()))       
            ->set('date', $refund->date()->toString())
            ->set('amount', $refund->amount())
            ->set('contributionId', $refund->contributionId())
            ->set('description', $refund->description())
            ->where('id', $this->uuid($refund->id()));
        $this->execute();
    }
    
    public function listRefund(array $where = []):Collector{
        $this->select('refund');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
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