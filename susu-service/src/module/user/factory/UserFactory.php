<?php
namespace src\module\user\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\Id;
use src\infrastructure\IUser;
use src\module\user\objects\User;

class UserFactory extends Collector{
    use Factory;

    protected $factory;

    public function __construct(){
        $this->factory = new AddressFactory();
    }

    public function mapResult($record):IUser{
        $user = new User();
        $user->setId($this->uuid($record['id']));
        $user->setFirstName($record['firstName']);
        $user->setLastName($record['lastName']);
        $user->setEmail($record['email']);
        $user->setPhoneNumber((string)$record['phoneNumber']);
        isset($record['date']) && $user->setDate($record['date']);
        $user->setForeignId($record['foreignId']);
        $user->setPicture($record['picture']??null);
        $user->setHide($record['hide']);
        $user->setGender($record['gender']??'');
        $this->isValidUUid($record['addressId']) && $user->setAddressId($this->uuid($record['addressId']));
        return $user;
    }
}