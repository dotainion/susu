<?php
namespace src\module\payout\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\payout\objects\Payout;

class PayoutFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Payout{
        $payout = new Payout();
        $payout->setId($this->uuid($record['id']));
        $payout->setSusuId($this->uuid($record['susuId']));
        $payout->setDate($record['date']);
        $payout->setMemberId($this->uuid($record['memberId']));
        $payout->setAmount($record['amount']);
        $payout->setDescription((string)$record['description']);
        $payout->setScheduleId($this->uuid($record['scheduleId']));
        return $payout;
    }
}