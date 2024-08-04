<?php
namespace src\module\susu\service;

use src\infrastructure\Collector;
use src\infrastructure\Service;
use src\module\susu\objects\Cycle;

class ListCycleService extends Service{

    public function __construct(){
        parent::__construct(false);
    }
    
    public function process(){
        $collector = new Collector();
        $collector->add(new Cycle(Cycle::Weekly));
        $collector->add(new Cycle(Cycle::BiWeekly));
        $collector->add(new Cycle(Cycle::Monthly));
        $collector->add(new Cycle(Cycle::BiMonthly));

        $this->setOutput($collector);
        return $this;
    }
}