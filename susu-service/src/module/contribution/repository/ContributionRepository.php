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
            ->column('id', $this->uuid($contribution->id()))
            ->column('susuId', $this->uuid($contribution->susuId()))
            ->column('memberId', $this->uuid($contribution->memberId()))
            ->column('date', $contribution->date()->toString())
            ->column('contribution', $contribution->contribution())
            ->column('description', $contribution->description());
        $this->execute();
    }
    
    public function edit(Contribution $contribution):void{
        $this->insert('contribution') 
            ->column('susuId', $this->uuid($contribution->susuId()))  
            ->column('memberId', $this->uuid($contribution->memberId()))       
            ->column('date', $contribution->date()->toString())
            ->column('contribution', $contribution->contribution())
            ->column('description', $contribution->description())
            ->where()->eq('id', $this->uuid($contribution->id()));
        $this->execute();
    }
    
    public function listContribution(array $where = []):Collector{
        $this->select('contribution');

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