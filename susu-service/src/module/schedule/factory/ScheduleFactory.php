<?php
namespace src\module\schedule\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\schedule\objects\Schedule;

class ScheduleFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Schedule{
        $susu = new Schedule();
        $susu->setId($this->uuid($record['id']));
        $susu->setMemberId($this->uuid($record['memberId']));
        $susu->setDate($record['date']);
        $susu->setSusuId($this->uuid($record['susuId']));
        $susu->setPosition((int)$record['position']);
        $susu->setAccurance((int)$record['accurance']);
        return $susu;
    }
}