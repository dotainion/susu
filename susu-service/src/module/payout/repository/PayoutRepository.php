<?php
namespace src\module\payout\repository;

use src\database\Repository;
use src\infrastructure\Collector;
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
            ->add('id', $this->uuid($payout->id()))
            ->add('susuId', $this->uuid($payout->susuId()))
            ->add('memberId', $this->uuid($payout->memberId()))
            ->add('date', $payout->date()->toString())
            ->add('amount', $payout->amount())
            ->add('scheduleId', $this->uuid($payout->scheduleId()))
            ->add('description', $payout->description());
        $this->execute();
    }
    
    public function edit(Payout $payout):void{
        $this->insert('payout') 
            ->set('susuId', $this->uuid($payout->susuId()))  
            ->set('memberId', $this->uuid($payout->memberId()))       
            ->set('date', $payout->date()->toString())
            ->set('amount', $payout->amount())
            ->set('scheduleId', $this->uuid($payout->scheduleId()))
            ->set('description', $payout->description())
            ->where('id', $this->uuid($payout->id()));
        $this->execute();
    }
    
    public function listPayout(array $where = []):Collector{
        $this->select('payout');

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