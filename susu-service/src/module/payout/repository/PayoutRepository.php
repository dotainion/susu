<?php
namespace src\module\payout\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\payout\factory\PayoutFactory;
use src\module\payout\objects\Payout;

class PayoutRepository extends Repository{
    protected PayoutFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new PayoutFactory();
    }
    
    public function create(Payout $payout):void{
        $this->insert('payout')        
            ->column('id', $this->uuid($payout->id()))
            ->column('susuId', $this->uuid($payout->susuId()))
            ->column('memberId', $this->uuid($payout->memberId()))
            ->column('date', $payout->date()->toString())
            ->column('amount', $payout->amount())
            ->column('description', $payout->description());
        $this->execute();
    }
    
    public function edit(Payout $payout):void{
        $this->insert('payout') 
            ->column('susuId', $this->uuid($payout->susuId()))  
            ->column('memberId', $this->uuid($payout->memberId()))       
            ->column('date', $payout->date()->toString())
            ->column('amount', $payout->amount())
            ->column('description', $payout->description())
            ->where()->eq('id', $this->uuid($payout->id()));
        $this->execute();
    }
    
    public function listPayout(array $where = []):Collector{
        $this->select('payout');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
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