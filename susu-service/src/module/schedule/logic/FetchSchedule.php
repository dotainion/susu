<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\susu\repository\ScheduleRepository;

class FetchSchedule{

    protected ScheduleRepository $repo;

    public function __construct() {
        $this->repo =new ScheduleRepository();
    }

    public function byId(Id $id):Collector{
        return $this->repo->listSchedules([
            'id' => $id
        ]);
    }

    public function byIdArray(array $idArray):Collector{
        return $this->repo->listSchedules([
            'id' => $idArray
        ]);
    }

    public function byMemberId(Id $memberId):Collector{
        return $this->repo->listSchedules([
            'memberId' => $memberId
        ]);
    }
}