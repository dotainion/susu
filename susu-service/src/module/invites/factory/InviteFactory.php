<?php
namespace src\module\invites\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\invites\objects\Invite;

class InviteFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Invite{
        $invite = new Invite();
        $invite->setId($this->uuid($record['id']));
        $invite->setMemberId($this->uuid($record['memberId']));
        $invite->setTargetId($this->uuid($record['targetId']));
        $invite->setDate($record['date']);
        $invite->setExpire($record['expire']);
        $invite->setIsSusu((bool)$record['isSusu']);
        return $invite;
    }
}