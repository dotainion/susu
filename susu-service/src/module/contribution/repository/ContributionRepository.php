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
            ->add('scheduleId', $this->uuid($contribution->scheduleId()))
            ->add('contribution', $contribution->contribution())
            ->add('description', $contribution->description());
        $this->execute();
    }
    
    public function edit(Contribution $contribution):void{
        $this->insert('contribution') 
            ->set('susuId', $this->uuid($contribution->susuId()))  
            ->set('memberId', $this->uuid($contribution->memberId()))       
            ->set('date', $contribution->date()->toString())
            ->set('scheduleId', $this->uuid($contribution->scheduleId()))
            ->set('contribution', $contribution->contribution())
            ->set('description', $contribution->description())
            ->where('id', $this->uuid($contribution->id()));
        $this->execute();
    }
    
    public function listContribution(array $where = []):Collector{
        $this->select('contribution');

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