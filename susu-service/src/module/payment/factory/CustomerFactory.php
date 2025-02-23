<?php
namespace src\module\payment\factory;

use src\module\payment\objects\Customer;
use src\module\user\objects\User;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class CustomerFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function convertFromUser(User $user):Customer{
        return new Customer(
            $user->id()->toString(), 
            trim($user->firstName() . ' ' . $user->lastName()), 
            $user->email(), 
            $user->phoneNumber(), 
            $user->gender()
        );
    }
}