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
            ->column('id', $this->uuid($schedule->id()))
            ->column('memberId', $this->uuid($schedule->memberId()))
            ->column('susuId', $this->uuid($schedule->susuId()))
            ->column('date', $schedule->date()->toString())
            ->column('accurance', $schedule->accurance())
            ->column('position', $schedule->position());
        $this->execute();
    }
    
    public function edit(Schedule $schedule):void{
        $this->update('schedule')  
            ->column('memberId', $this->uuid($schedule->memberId()))
            ->column('susuId', $this->uuid($schedule->susuId()))
            ->column('date', $schedule->date()->toString())
            ->column('accurance', $schedule->accurance())
            ->column('position', $schedule->position())
            ->where()->eq('id', $this->uuid($schedule->id()));
        $this->execute();
    }

    public function listSchedules(array $where = []):Collector{
        $this->select('schedule');

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