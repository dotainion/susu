<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Service;

class FetchSessionService extends Service{
    public function __construct(){
        parent::__construct(false);
    }
    
    public function process($token){
        Assert::validToken($token, 'Invalid token');

        if($this->security()->hasSession() && $this->security()->session()->token()->toString() === $token){
            $this->security()->assertUserAccess();
            $this->setOutput($this->security()->user());
            return $this;
        }
        
        throw new NotAuthenticatedException('Your are not authenticted.');
    }
}