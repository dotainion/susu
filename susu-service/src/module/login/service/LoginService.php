<?php
namespace src\module\login\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Email;
use src\infrastructure\Password;
use src\infrastructure\Phone;
use src\infrastructure\Service;
use src\security\SecurityManager;

class LoginService extends Service{
    protected SecurityManager $security;

    public function __construct(){
        parent::__construct(false);
        $this->security = new SecurityManager();
    }
    
    public function process($email, $phone, $password){
        Assert::validPassword($password, 'Invalid password', false);
        
        if(!$email && !$phone){
            throw new InvalidArgumentException('Invalid email or phone number.');
        }

        if($email){
            Assert::validEmail($email, 'Invalid email');
            $identifier = new Email();
            $identifier->set($email);
        }else{
            $identifier = new Phone();
            $identifier->set($phone);
        }

        $passwordObj = new Password();
        $passwordObj->set($password);

        $this->security->login($identifier, $passwordObj);
        
        $this->setOutput($this->security->user());
        return $this;
    }
}