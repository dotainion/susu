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
        $susu->setAccurance((int)$record['accurance']);
        $susu->setStartDate($record['startDate']);
        $susu->setCommunityId($this->uuid($record['communityId']));
        $susu->setPendingStart((bool)$record['pendingStart']);
        $susu->setCompleted((bool)$record['completed']);
        $susu->setCanceled((bool)$record['canceled']);
        return $susu;
    }
}