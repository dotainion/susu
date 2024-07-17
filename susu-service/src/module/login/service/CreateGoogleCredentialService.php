<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\factory\CredentialFactory;
use src\module\login\logic\CreateCredential;

class CreateGoogleCredentialService extends Service{
    protected CredentialFactory $factory;
    protected CreateCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new CredentialFactory();
        $this->credential = new CreateCredential();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');
        
        $idObj = new Id();
        $idObj->set($id);

        $credential = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'hide' => false,
            'token' => (new Token())->new()->toString(),
            'password' => null,
        ]);

        $this->credential->create($credential);
        
        return $this;
    }
}