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
            ->column('gender')->string()
            ->column('phoneNumber')->string()
            ->column('addressId')->bindary()
            ->column('foreignId')->string();
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
            ->column('description')->paragraph()
            ->column('createdDate')->timestamp()     
            ->column('creatorId')->bindary()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function groupLink(){
        $this->sql->create('groupLink')
            ->column('groupId')->bindary()
            ->column('memberId')->bindary();
        return $this->sql->execute();
    }

    public function susu(){
        $this->sql->create('susu')        
            ->column('id')->bindary()
            ->column('contribution')->string()
            ->column('cycle')->string()
            ->column('accurance')->int()
            ->column('startDate')->timestamp()     
            ->column('groupId')->bindary()
            ->column('pendingStart')->bool()
            ->column('completed')->bool()
            ->column('canceled')->bool();
        return $this->sql->execute();
    }

    public function susuLink(){
        $this->sql->create('susuLink')
            ->column('susuId')->bindary()
            ->column('memberId')->bindary()
            ->column('position')->int();
        return $this->sql->execute();
    }

    public function contribution(){
        $this->sql->create('contribution')
            ->column('id')->bindary()
            ->column('susuId')->bindary()
            ->column('memberId')->bindary()
            ->column('scheduleId')->bindary()
            ->column('contribution')->string()
            ->column('description')->paragraph()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function payout(){
        $this->sql->create('payout')
            ->column('id')->bindary()
            ->column('susuId')->bindary()
            ->column('memberId')->bindary()
            ->column('scheduleId')->bindary()
            ->column('amount')->string()
            ->column('description')->paragraph()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function refund(){
        $this->sql->create('refund')
            ->column('id')->bindary()
            ->column('susuId')->bindary()
            ->column('memberId')->bindary()
            ->column('amount')->string()
            ->column('description')->paragraph()
            ->column('contributionId')->bindary()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function schedule(){
        $this->sql->create('schedule')
            ->column('id')->bindary()
            ->column('susuId')->bindary()
            ->column('memberId')->bindary(true)
            ->column('date')->timestamp()
            ->column('position')->int()
            ->column('accurance')->int();
        return $this->sql->execute();
    }

    public function message(){
        $this->sql->create('message')
            ->column('id')->bindary()
            ->column('message')->book()
            ->column('date')->timestamp()
            ->column('fromId')->bindary()
            ->column('toId')->bindary()
            ->column('read')->bool()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function invite(){
        $this->sql->create('invite')
            ->column('id')->bindary()
            ->column('memberId')->bindary()
            ->column('targetId')->bindary()
            ->column('date')->timestamp()
            ->column('expire')->timestamp()
            ->column('isSusu')->bool();
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
