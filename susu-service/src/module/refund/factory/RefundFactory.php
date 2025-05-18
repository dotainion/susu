<?php
namespace src\module\refund\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\refund\objects\Refund;

class RefundFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Refund{
        $history = new Refund();
        $history->setId($this->uuid($record['id']));
        $history->setSusuId($this->uuid($record['susuId']));
        $history->setDate($record['date']);
        $history->setMemberId($this->uuid($record['memberId']));
        $history->setAmount($record['amount']);
        $history->setDescription((string)$record['description']);
        $history->setContributionId($this->uuid($record['contributionId']));
        $history->setReason((string)($record['reason'] ?? ''));
        $history->setType($record['type']);
        return $history;
    }
}