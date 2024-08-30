<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\schedule\objects\Schedule;
use src\module\susu\repository\ScheduleRepository;

class SetSchedule{

    protected ScheduleRepository $repo;

    public function __construct() {
        $this->repo =new ScheduleRepository();
    }

    public function set(Schedule $schedule):void{
        $collector = $this->repo->listSchedules([
            'id' => $schedule->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($schedule);
            return;
        }
        $this->repo->create($schedule);
    }

    public function masSet(Collector $scheduleCollector):void{
        foreach($scheduleCollector->list() as $schedule){
            $this->set($schedule);
        }
    }
}