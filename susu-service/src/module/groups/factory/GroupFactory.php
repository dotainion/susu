<?php
namespace src\module\groups\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\groups\objects\Group;

class GroupFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Group{
        $group = new Group();
        $group->setId($this->uuid($record['id']));
        $group->setName($record['name']);
        $group->setDescription($record['description'] ?? '');
        $group->setCreatedDate($record['createdDate']);
        $group->setCreatorId($this->uuid($record['creatorId']));
        $group->setHide((bool)$record['hide']);
        return $group;
    }
}