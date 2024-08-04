<?php
namespace src\module\contribution\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\contribution\factory\ContributionFactory;
use src\module\contribution\objects\Contribution;

class ContributionRepository extends Repository{
    protected ContributionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ContributionFactory();
    }
    
    public function create(Contribution $contribution):void{
        $this->insert('contribution')        
            ->add('id', $this->uuid($contribution->id()))
            ->add('susuId', $this->uuid($contribution->susuId()))
            ->add('memberId', $this->uuid($contribution->memberId()))
            ->add('date', $contribution->date()->toString())
            ->add('contribution', $contribution->contribution())
            ->add('description', $contribution->description())
            ->add('paid', $contribution->paid())
            ->add('refunded', $contribution->refunded())
            ->add('payout', $contribution->payout())
            ->add('hide', $contribution->hide());
        $this->execute();
    }
    
    public function edit(Contribution $contribution):void{
        $this->insert('contribution') 
            ->set('susuId', $this->uuid($contribution->susuId()))  
            ->set('memberId', $this->uuid($contribution->memberId()))       
            ->set('date', $contribution->date()->toString())
            ->set('contribution', $contribution->contribution())
            ->set('description', $contribution->description())
            ->set('paid', $contribution->paid())
            ->set('refunded', $contribution->refunded())
            ->set('payout', $contribution->payout())
            ->set('hide', $contribution->hide())
            ->where('id', $this->uuid($contribution->id()));
        $this->execute();
    }
    
    public function listHistory(array $where = []):Collector{
        $this->select('contribution');

        if(isset($where['paid'])){
            $this->where('paid', (int)$where['paid']);
        }
        if(isset($where['refunded'])){
            $this->where('refunded', (int)$where['refunded']);
        }
        if(isset($where['payout'])){
            $this->where('payout', (int)$where['payout']);
        }
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['susuId'])){
            $this->where('susuId', $this->uuid($where['susuId']));
        }
        if(isset($where['memberId'])){
            $this->where('memberId', $this->uuid($where['memberId']));
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}