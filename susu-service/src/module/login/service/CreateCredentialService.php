<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Password;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\factory\CredentialFactory;
use src\module\login\logic\CreateCredential;

class CreateCredentialService extends Service{
    protected CredentialFactory $factory;
    protected CreateCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new CredentialFactory();
        $this->credential = new CreateCredential();
    }
    
    public function process($id, $password){
        Assert::validUuid($id, 'User not found.');
        Assert::validPassword($password, 'Invalid password.');
        
        $idObj = new Id();
        $idObj->set($id);
        $passwordObj = new Password();
        $passwordObj->set($password);

        $credential = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'hide' => false,
            'token' => (new Token())->new()->toString(),
            'password' => $passwordObj->toString(),
        ]);

        $this->credential->create($credential);
        
        return $this;
    }
}