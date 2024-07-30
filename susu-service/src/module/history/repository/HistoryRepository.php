<?php
namespace src\module\history\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\history\factory\HistoryFactory;
use src\module\history\objects\History;

class HistoryRepository extends Repository{
    protected HistoryFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new HistoryFactory();
    }
    
    public function create(History $history):void{
        $this->insert('susuHistory')        
            ->add('susuId', $this->uuid($history->id()))
            ->add('memberId', $this->uuid($history->memberId()))
            ->add('date', $history->date()->toString())
            ->add('contribution', $history->contribution())
            ->add('hide', $history->hide());
        $this->execute();
    }
    
    public function edit(History $history):void{
        $this->insert('susuHistory') 
            ->set('memberId', $this->uuid($history->memberId()))       
            ->set('date', $history->date()->toString())
            ->set('contribution', $history->contribution())
            ->set('hide', $history->hide())
            ->where('susuId', $this->uuid($history->id()));
        $this->execute();
    }
    
    public function listHistory(array $where = []):Collector{
        $this->select('susuHistory');

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