<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\user\factory\UserFactory;
use src\module\user\logic\EditUser;

class EditUserService extends Service{
    protected EditUser $user;
    protected UserFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->user = new EditUser();
        $this->factory = new UserFactory();
    }
    
    public function process($id, $name, $email, $phoneNumber){
        Assert::validEmail($email, 'Invalid email');
        Assert::validUuid($id??'', 'User not found.');

        $user = $this->factory->mapResult([
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'date' => null,
            'hide' => false
        ]);
        
        $this->user->edit($user);

        $this->setOutput($user);
        return $this;
    }
}