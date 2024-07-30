<?php
namespace src\module\history\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\history\objects\History;

class HistoryFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):History{
        $history = new History();
        $history->setId($this->uuid($record['susuId']));
        $history->setDate($record['date']);
        $history->setMemberId($this->uuid($record['memberId']));
        $history->setContribution($record['contribution']);
        $history->setHide($record['hide']);
        return $history;
    }
}