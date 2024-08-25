<?php
namespace src\module\contribution\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\contribution\objects\Contribution;

class ContributionFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Contribution{
        $history = new Contribution();
        $history->setId($this->uuid($record['id']));
        $history->setSusuId($this->uuid($record['susuId']));
        $history->setDate($record['date']);
        $history->setMemberId($this->uuid($record['memberId']));
        $history->setContribution($record['contribution']);
        $history->setDescription((string)$record['description']);
        return $history;
    }
}