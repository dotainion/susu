<?php
namespace src\module\susu\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\susu\objects\Susu;

class SusuFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Susu{
        $susu = new Susu();
        $susu->setId($this->uuid($record['id']));
        $susu->setContribution($record['contribution']);
        $susu->setCycle($record['cycle']);
        $susu->setPayoutDate($record['payoutDate']);
        $susu->setStartDate($record['startDate']);
        $susu->setGroupId($this->uuid($record['groupId']));
        $susu->setPendingStart((bool)$record['pendingStart']);
        $susu->setCompleted((bool)$record['completed']);
        return $susu;
    }
}