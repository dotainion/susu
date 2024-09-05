<?php
namespace src\module\communities\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\communities\objects\Community;

class CommunityFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Community{
        $community = new Community();
        $community->setId($this->uuid($record['id']));
        $community->setName($record['name']);
        $community->setDescription($record['description'] ?? '');
        $community->setCreatedDate($record['createdDate']);
        $community->setCreatorId($this->uuid($record['creatorId']));
        $community->setHide((bool)$record['hide']);
        return $community;
    }
}