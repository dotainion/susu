<?php
namespace src\module\groups\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\groups\objects\GroupLink;

class GroupLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):GroupLink{
        $link = new GroupLink();
        $link->setGroupId($this->uuid($record['groupId']));
        $link->setMemberId($this->uuid($record['memberId']));
        return $link;
    }
}