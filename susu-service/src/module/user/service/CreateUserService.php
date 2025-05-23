<?php
namespace src\module\user\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\service\CreateCredentialService;
use src\module\login\service\LoginService;
use src\module\user\factory\AddressFactory;
use src\module\user\factory\UserFactory;
use src\module\user\logic\CreateUser;
use src\module\user\logic\SetAddress;

class CreateUserService extends Service{
    protected CreateUser $user;
    protected UserFactory $factory;
    protected SetAddress $address;
    protected AddressFactory $addressFactory;
    protected CreateCredentialService $credentials;
    protected LoginService $login;

    public function __construct(){
        parent::__construct(false);
        $this->user = new CreateUser();
        $this->factory = new UserFactory();
        $this->address = new SetAddress();
        $this->addressFactory = new AddressFactory();
        $this->credentials = new CreateCredentialService();
        $this->login = new LoginService();
    }
    
    public function process($firstName, $lastName, $email, $phoneNumber, $gender, $password, $confirmPassword, $session){
        Assert::validPassword($password);
        Assert::validPassword($confirmPassword);
        Assert::validPasswordMatch($password, $confirmPassword);
        
        if($session !== null && !is_array($session)){
            throw new InvalidArgumentException('Session param should be an array.');
        }

        $user = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'foreignId' => null,
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false,
            'gender' => $gender,
            'addressId' => (new Id())->new()->toString(),
        ]);

        $address = $this->addressFactory->mapResult([
            'id' => $user->addressId()->toString()
        ]);

        $this->address->setAddress($address);
        $this->user->create($user);
        $this->credentials->process($user->id()->toString(), $password, $session);

        if($session !== null && isset($session['authenticate']) && $session['authenticate'] === 'auto'){
            $service = $this->login->process($email, $phoneNumber, $password);
            $this->mergeOutput($service);
            return $this;
        }

        $this->setOutput($user);
        return $this;
    }
}