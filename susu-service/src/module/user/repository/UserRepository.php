<?php
namespace src\module\user\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\user\factory\UserFactory;
use src\module\user\objects\User;

class UserRepository extends Repository{
    protected UserFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new UserFactory();
    }
    
    public function create(User $user):void{
        $this->insert('user')        
            ->add('id', $this->uuid($user->id()))
            ->add('firstName', $user->firstName())
            ->add('lastName', $user->lastName())
            ->add('email', $user->email())
            ->add('hide', (int)$user->hide())
            ->add('date', $user->date())
            ->add('gender', $user->gender())
            ->add('phoneNumber', $user->phoneNumber())
            ->add('addressId', $this->uuid($user->addressId()))
            ->add('foreignId', $user->foreignId());
        $this->execute();
    }
    
    public function edit(User $user):void{
        $this->update('user')       
            ->set('firstName', $user->firstName())
            ->set('lastName', $user->lastName())
            ->set('email', $user->email())
            ->set('hide', (int)$user->hide())
            //->set('date', $user->date())
            ->set('gender', $user->gender())
            ->set('phoneNumber', $user->phoneNumber())
            ->set('foreignId', $user->foreignId())
            //->set('addressId', $this->uuid($user->addressId()))
            ->where('id', $this->uuid($user->id()));
        $this->execute();
    }
    
    public function listUsers(array $where=[]):Collector{
        $this->select('user');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('date', $where['from'], $where['to']);
        }
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['foreignId'])){
            $this->where('foreignId', $where['foreignId']);
        }
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        if(isset($where['date'])){
            $this->where('date', $where['date']);
        }
        if(isset($where['gender'])){
            $this->where('gender', $where['gender']);
        }
        if(isset($where['phoneNumber'])){
            $this->where('phoneNumber', $where['phoneNumber']);
        }
        if(isset($where['firstName'])){
            $this->like('firstName', $where['firstName']);
        }
        if(isset($where['lastName'])){
            $this->like('lastName', $where['lastName']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}