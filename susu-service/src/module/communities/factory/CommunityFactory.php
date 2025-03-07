<?php
namespace src\module\communities\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
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
        $community->setPrivacy($record['privacy'] ?? '');
        $community->setHide((bool)$record['hide']);
        return $community;
    }
}