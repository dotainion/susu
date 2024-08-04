<?php
namespace src\module\susu\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\susu\objects\SusuLink;

class SusuLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):SusuLink{
        $susu = new SusuLink();
        $susu->setSusuId($this->uuid($record['susuId']));
        $susu->setMemberId($this->uuid($record['memberId']));
        $susu->setPosition((int)$record['position']);
        return $susu;
    }
}