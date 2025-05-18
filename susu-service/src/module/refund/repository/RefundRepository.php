<?php
namespace src\module\refund\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
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
            ->column('id', $this->uuid($refund->id()))
            ->column('susuId', $this->uuid($refund->susuId()))
            ->column('memberId', $this->uuid($refund->memberId()))
            ->column('date', $refund->date()->toString())
            ->column('amount', $refund->amount())
            ->column('contributionId', $refund->contributionId())
            ->column('description', $refund->description())
            ->column('reason', $refund->reason())
            ->column('type', $refund->type());
        $this->execute();
    }
    
    public function edit(Refund $refund):void{
        $this->update('refund') 
            ->column('susuId', $this->uuid($refund->susuId()))  
            ->column('memberId', $this->uuid($refund->memberId()))       
            ->column('date', $refund->date()->toString())
            ->column('amount', $refund->amount())
            ->column('contributionId', $refund->contributionId())
            ->column('description', $refund->description())
            ->column('reason', $refund->reason())
            ->column('type', $refund->type())
            ->where()->eq('id', $this->uuid($refund->id()));
        $this->execute();
    }
    
    public function listRefund(array $where = []):Collector{
        $this->select('refund');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['susuId'])){
            $this->where()->eq('susuId', $this->uuid($where['susuId']));
        }
        if(isset($where['memberId'])){
            $this->where()->eq('memberId', $this->uuid($where['memberId']));
        }
        if(isset($where['type'])){
            $this->where()->eq('type', $where['type']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}