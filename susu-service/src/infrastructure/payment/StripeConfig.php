<?php
namespace src\infrastructure\payment;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\ParseConfig;

class StripeConfig implements IObjects{
    protected Id $id;
    protected ParseConfig $config;

    public function __construct(){
        $this->id = (new Id())->new();
        $this->config = new ParseConfig();
    }

    public function id():IId{
        return $this->id;
    }
    
    public function secretKey():string{
        return $this->config->secretKey();
    }
    
    public function publishableKey():string{
        return $this->config->publishableKey();
    }
}