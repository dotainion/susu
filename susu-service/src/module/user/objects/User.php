<?php
namespace src\module\user\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\IUser;
use src\infrastructure\Token;

class User implements IObjects, IUser{
    protected Id $id;
    protected ?string $foreignId = null;
    protected string $firstName;
    protected string $lastName;
    protected Email $email;
    protected bool $hide;
    protected ?DateHelper $date = null;
    protected Token $token;
    protected string $phoneNumber;
    protected ?string $picture = null;
    protected ?Id $addressId = null;
    protected ?Address $address = null;
    protected ?string $bio = null;
    protected ?string $gender = null;

    public function __construct(){
        $this->id = new Id();
        $this->token = new Token();
        $this->email = new Email();
    }

    public function id():IId{
        return $this->id;
    }

    public function foreignId():?string{
        return $this->foreignId;
    }
    
    public function date():?DateHelper{
        return $this->date;
    }
    
    public function firstName():string{
        return $this->firstName;
    }
    
    public function lastName():string{
        return $this->lastName;
    }

    public function email():string{
        return $this->email->toString();
    }

    public function hide():bool{
        return $this->hide;
    }

    public function picture():?string{
        return $this->picture;
    }

    public function phoneNumber():string{
        return $this->phoneNumber;
    }

    public function token():?string{
        if(!$this->token->hasToken()){
            return null;
        }
        return $this->token->toString();
    }

    public function addressId():?Id{
        return $this->addressId;
    }

    public function address():?Address{
        return $this->address;
    }

    public function bio():?string{
        return $this->bio;
    }

    public function gender():?string{
        return $this->gender;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setForeignId(?string $foreignId):void{
        $this->foreignId = $foreignId;
    }

    public function setPhoneNumber(string $phoneNumber):void{
        $this->phoneNumber = $phoneNumber;
    }

    public function setEmail(string $email):void{
        $this->email->set($email);
    }

    public function setPicture(?string $picture):void{
        $this->picture = $picture;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setToken(string $token):void{
        $this->token->set($token);
    }

    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }
    
    public function setFirstName(string $firstName):void{
        $this->firstName = $firstName;
    }
    
    public function setLastName(string $lastName):void{
        $this->lastName = $lastName;
    }

    public function setAddressId(string $addressId):void{
        $this->addressId = new Id($addressId);
    }
    
    public function setAddress(Address $address):void{
        $this->address = $address;
    }
    
    public function setBio(string $bio):void{
        $this->bio = $bio;
    }
    
    public function setGender(string $gender):void{
        $this->gender = $gender;
    }
}