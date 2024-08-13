<?php
namespace src\security;

use src\infrastructure\ApiRequest;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\ICredential;
use src\infrastructure\IIdentifier;
use src\infrastructure\IUser;
use src\infrastructure\Password;
use src\infrastructure\Token;

class SecurityManager{

    use PasswordTrait;

    protected string $SESSION_KEY = 'session-key';
    protected Login $login;
    protected Logout $logout;

    public function __construct(){
        $this->login = new Login();
        $this->logout = new Logout();
    }

    private function _updateAccessToken(Security $credential):ICredential{
        $token = new Token();
        $this->login->updateToken($credential->user()->id(), $token->new());
        $credential->user()->setToken($token->toString());
        $credential->setToken($token->toString());
        return $credential;
    }

    public function login(IIdentifier $identifier, Password $password):void{
        $collector = $this->login->login($identifier);
        if(!$collector->first()->hasPassword()){
            throw new NotAuthenticatedException('This account do not have login access.');
        }
        $this->assertSignInPass($collector->first()->password(), $password);
        $credential = $collector->first();
        $credential = $this->_updateAccessToken($credential);
        $this->startSession($credential);
    }

    public function googleLogin(string $accessToken):void{
        $api = new ApiRequest();
        $api->setUrl('https://www.googleapis.com/oauth2/v1/userinfo?access_token='.$accessToken);
        $api->setHeader($accessToken);
        $api->send();
        if($api->hasError()){
            throw new NotAuthenticatedException('You are not logged in.');
        }
        $collector = $this->login->googleLogin($api->get('id'));
        if(!$collector->hasItem()){
            throw new NotAuthenticatedException('Account not found.');
        }
        $security = $collector->first();
        $credential = $this->_updateAccessToken($security);
        $this->startSession($credential);
    }

    public function hasSession(): bool{
        return (array_key_exists($this->SESSION_KEY, $_SESSION) && unserialize($_SESSION[$this->SESSION_KEY]) !== false);
    }

    public function user():IUser{
        $this->assertUserAccess();
        return $this->session()->user();
    }

    public function session():?ICredential{
        $session = unserialize($_SESSION[$this->SESSION_KEY]);
        if(!$session instanceof ICredential){
            return null;
        }
        return $session;
    }

    public function isLoggedIn():bool{
        $session = $this->session();
        if(!$session instanceof ICredential || !$session->token()){
            throw new NotAuthenticatedException('You are not logged in.');
        }
        return true;
    }

    public function assertUserAccess():bool{
        if($this->isLoggedIn()){
            return true;
        }
        throw new NotAuthenticatedException('You are not logged in.');
    }

    public function startSession(ICredential $user){
        $_SESSION[$this->SESSION_KEY] = serialize($user);
    }

    public function logout(){
        $this->logout->logout($this->user()->id());
        unset($_SESSION[$this->SESSION_KEY]);
        session_destroy();
    }
}