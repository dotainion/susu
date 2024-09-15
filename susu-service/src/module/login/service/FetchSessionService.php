<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Service;
use src\infrastructure\Token;

class FetchSessionService extends Service{
    public function __construct(){
        parent::__construct(false);
    }
    
    public function process($token){
        Assert::validToken($token, 'Invalid token');

        if($this->security()->authenticated(new Token($token))){
            $this->setOutput($this->security()->user());
            return $this;
        }
        
        throw new NotAuthenticatedException('Your are not authenticted.');
    }
}