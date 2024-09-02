<?php
namespace src\security;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\ICredential;
use src\module\user\factory\UserFactory;

class SecurityFactory extends Collector{
    use Factory;
    protected UserFactory $factory;

    public function __construct(){
        $this->factory = new UserFactory();
    }

    public function mapResult($record):ICredential{
        $security = new Security();
        $security->setId($this->uuid($record['id']));
        $security->setExpire($record['expire']);
        if(isset($record['password'])){
            $security->setPassword($record['password']);
        }
        if(isset($record['token'])){
            $security->setToken($record['token']);
        }
        if(isset($record['refreshToken'])){
            $security->setRefreshToken($record['refreshToken']);
        }
        if(isset($record['email'])){
            $security->setUser($this->factory->mapResult($record));
        }
        return $security;
    }
}