<?php
namespace src\module\user\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\user\factory\AddressFactory;
use src\module\user\objects\Address;

class AddressRepository extends Repository{
    protected AddressFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AddressFactory();
    }
    
    public function create(Address $address):void{
        $this->insert('address')        
            ->add('id', $this->uuid($address->id()))
            ->add('country', $address->country())
            ->add('state', $address->state())
            ->add('address', $address->address())
            ->add('apt', $address->apt())
            ->add('zip', $address->zip());
        $this->execute();
    }
    
    public function edit(Address $address):void{
        $this->update('address')
            ->set('country', $address->country())
            ->set('state', $address->state())
            ->set('address', $address->address())
            ->set('apt', $address->apt())
            ->set('zip', $address->zip())
            ->where('id', $this->uuid($address->id()));
        $this->execute();
    }
    
    public function listAddress(array $where=[]):Collector{
        $this->select('address');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}