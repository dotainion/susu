<?php
namespace src\module\schedule\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\susu\repository\ScheduleRepository;

class ListSchedule{

    protected ScheduleRepository $repo;

    public function __construct() {
        $this->repo =new ScheduleRepository();
    }

    public function bySusuId(Id $susuId):Collector{
        return $this->repo->listSchedules([
            'susuId' => $susuId
        ]);
    }
}