<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Password;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\logic\UpdateCredential;
use src\module\user\logic\FetchUser;

class UpdateCredentialByTokenService extends Service{
    protected FetchUser $fetch;
    protected UpdateCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchUser();
        $this->credential = new UpdateCredential();
    }
    
    public function process($id, $password, $refreshToken){
        Assert::validUuid($id, 'User not found.');
        Assert::validPassword($password, 'Incorrect password.');
        Assert::validToken($refreshToken, 'Invalid token.');

        $userId = new Id();
        $userId->set($id);
        $passwordObj = new Password();
        $passwordObj->set($password);
        $token = new Token();
        $token->set($refreshToken);

        $this->credential->updateByToken($userId, $passwordObj, $token);
        $this->credential->unsetTokenRefreshToken($userId, $token);

        $collector = $this->fetch->user($userId);
        $this->setOutput($collector);

        return $this;
    }
}