<?php
namespace src\security;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Id;
use src\infrastructure\IIdentifier;
use src\infrastructure\Phone;
use src\infrastructure\Token;

class Login{
    protected SecurityRepository $repo;

    public function __construct(){
        $this->repo = new SecurityRepository();
    }

    public function login(IIdentifier $identifier):Collector{
        $collector = $this->repo->listSecurity([
            'phoneNumber' => $identifier->toString()
        ]);
        if(!$collector->hasItem()){
            $collector = $this->repo->listSecurity([
                'email' => $identifier->toString()
            ]);
            if($collector->hasItem()){
                return $collector;
            }
            $message = 'No account exist for this email.';
            $identifier instanceof Phone && $message = 'No account exist for this phone number.';
            throw new NotAuthenticatedException($message);
        }
        return $collector;
    }

    public function byToken(Token $token):Collector{
        return $this->repo->listSecurity([
            'token' => $token->toString()
        ]);
    }

    public function googleLogin(string $foreignId):Collector{
        $collector = $this->repo->listSecurity([
            'foreignId' => $foreignId
        ]);
        if(!$collector->hasItem()){
            throw new NotAuthenticatedException('This google account is not registered.');
        }
        return $collector;
    }

    public function updateToken(Id $id, Token $token):void{
        $expire = new DateHelper();
        $expire->new()->addMinutes(30);
        $this->repo->updateToken($id, $token, $expire);
    }
}