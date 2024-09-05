<?php
namespace src\module\communities\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\communities\objects\CommunityLink;

class CommunityLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):CommunityLink{
        $link = new CommunityLink();
        $link->setCommunityId($this->uuid($record['communityId']));
        $link->setMemberId($this->uuid($record['memberId']));
        return $link;
    }
}