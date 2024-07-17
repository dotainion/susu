<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\service\CreateCredentialService;
use src\module\user\factory\AddressFactory;
use src\module\user\factory\UserFactory;
use src\module\user\logic\CreateUser;
use src\module\user\logic\SetAddress;

class CreateUserService extends Service{
    protected CreateUser $user;
    protected UserFactory $factory;
    protected SetAddress $address;
    protected AddressFactory $addressFactory;

    public function __construct(){
        parent::__construct(false);
        $this->user = new CreateUser();
        $this->factory = new UserFactory();
        $this->address = new SetAddress();
        $this->addressFactory = new AddressFactory();
    }
    
    public function process($name, $email, $phoneNumber, $password, $confirmPassword, $isAdmin=false){
        Assert::validPassword($password);
        Assert::validPassword($confirmPassword);
        Assert::validPasswordMatch($password, $confirmPassword);    

        $user = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'name' => $name,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'foreignId' => null,
            'isAdmin' => $isAdmin,
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false,
            'billingAddressId' => (new Id())->new()->toString(),
            'shippingAddressId' => (new Id())->new()->toString(),
        ]);

        $billingAddresss = $this->addressFactory->mapResult([
            'id' => $user->billingAddressId()->toString()
        ]);

        $shippingAddresss = $this->addressFactory->mapResult([
            'id' => $user->shippingAddressId()->toString()
        ]);

        $this->address->setAddress($billingAddresss);
        $this->address->setAddress($shippingAddresss);
        
        $this->user->create($user);

        (new CreateCredentialService())->process($user->id()->toString(), $password);

        $this->setOutput($user);
        return $this;
    }
}