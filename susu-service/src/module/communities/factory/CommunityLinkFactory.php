<?php
namespace src\module\communities\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
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