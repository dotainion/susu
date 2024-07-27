<?php
namespace src\module\susu\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\susu\objects\Schedule;
use src\module\user\objects\User;

class ScheduleFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Schedule{
        $susu = new Schedule();
        $susu->setId($this->uuid($record['id']));
        $susu->setDate($record['date']);
        $susu->setPosition((int)$record['position']);
        if(isset($record['user']) && $record['user'] instanceof User){
            $susu->setUser($record['user']);
        }
        return $susu;
    }
}