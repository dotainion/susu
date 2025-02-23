<?php
namespace src\module\payment\objects;

use tools\infrastructure\ICustomer;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Customer  implements IObjects, ICustomer{
    protected Id $id;
    protected string $name;
    protected string $email;
    protected string $phone;
    protected string $gender;

    public function __construct(string $id, string $name, string $email, string $phone, string $gender){
        $this->id = new Id($id);
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->gender = $gender;
    }

    public function id():Id{
        return $this->id;
    }
    
    public function name():string{
        return $this->name;
    }
    
    public function email():string{
        return $this->email;
    }

    public function phone():string{
        return $this->phone;
    }

    public function gender():string{
        return $this->gender;
    }
}