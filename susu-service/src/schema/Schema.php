<?php
namespace src\schema;

use Exception;
use src\database\Table;

class Schema{
    protected $sql = null;

    public function __construct(){
        $this->sql = new Table();
    }

    public function user(){
        $this->sql->create('user')
            ->column('id')->bindary()
            ->column('firstName')->string()
            ->column('lastName')->string()
            ->column('email')->string()
            ->column('hide')->bool()
            ->column('date')->timestamp()
            ->column('phoneNumber')->string()
            ->column('addressId')->bindary()
            ->column('foreignId')->string()
            ->column('isAdmin')->bool();
        return $this->sql->execute();
    }

    public function address(){
        $this->sql->create('address')
            ->column('id')->bindary()
            ->column('country')->string()
            ->column('state')->string()
            ->column('address')->paragraph()
            ->column('apt')->string()
            ->column('zip')->string();
        return $this->sql->execute();
    }

    public function credential(){
        $this->sql->create('credential')
            ->column('id')->bindary()
            ->column('expire')->timestamp()
            ->column('password')->string()
            ->column('token')->string()
            ->column('refreshToken')->string();
        return $this->sql->execute();
    }

    public function group(){
        $this->sql->create('group')        
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('contribution')->string()
            ->column('description')->paragraph()
            ->column('cycle')->string()
            ->column('payoutDate')->timestamp()
            ->column('createdDate')->timestamp()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function groupLink(){
        $this->sql->create('groupLink')
            ->column('groupId')->bindary()
            ->column('memberId')->bindary();
        return $this->sql->execute();
    }

    public function run(){
        foreach(get_class_methods($this) as $method){
            if($method === '__construct' || $method === 'run') continue;
            if (!is_callable([$this, $method])) {
                throw new Exception($method.' is not callable');
            }
            $this->$method()->reset();
        }
    }
}
