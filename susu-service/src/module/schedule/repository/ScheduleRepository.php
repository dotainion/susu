<?php
namespace src\module\susu\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\schedule\factory\ScheduleFactory;
use src\module\schedule\objects\Schedule;

class ScheduleRepository extends Repository{
    protected ScheduleFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ScheduleFactory();
    }
    
    public function create(Schedule $schedule):void{
        $this->insert('schedule')        
            ->add('id', $this->uuid($schedule->id()))
            ->add('memberId', $this->uuid($schedule->memberId()))
            ->add('susuId', $this->uuid($schedule->susuId()))
            ->add('date', $schedule->date()->toString())
            ->add('accurance', $schedule->accurance())
            ->add('position', $schedule->position());
        $this->execute();
    }
    
    public function edit(Schedule $schedule):void{
        $this->update('schedule')  
            ->set('memberId', $this->uuid($schedule->memberId()))
            ->set('susuId', $this->uuid($schedule->susuId()))
            ->set('date', $schedule->date()->toString())
            ->set('accurance', $schedule->accurance())
            ->set('position', $schedule->position())
            ->where('id', $this->uuid($schedule->id()));
        $this->execute();
    }

    public function listSchedules(array $where = []):Collector{
        $this->select('schedule');

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