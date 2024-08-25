<?php
namespace src\module\invites\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\invites\factory\InviteFactory;
use src\module\invites\objects\Invite;

class InviteRepository extends Repository{
    protected InviteFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new InviteFactory();
    }
    
    public function create(Invite $invite):void{
        $this->insert('invite')        
            ->add('id', $this->uuid($invite->id()))
            ->add('memberId', $this->uuid($invite->memberId()))
            ->add('targetId', $this->uuid($invite->targetId()))
            ->add('date', $invite->date()->toString())
            ->add('expire', $invite->expire()->toString())
            ->add('isSusu', $invite->isSusu());
        $this->execute();
    }
    
    public function edit(Invite $invite):void{
        $this->insert('invite') 
            ->set('memberId', $this->uuid($invite->memberId()))  
            ->set('targetId', $this->uuid($invite->targetId()))       
            ->set('date', $invite->date()->toString())
            ->set('expire', $invite->expire())
            ->set('isSusu', $invite->isSusu())
            ->where('id', $this->uuid($invite->id()));
        $this->execute();
    }
    
    public function deleteInvite(Id $id):void{
        $this->delete('invite')
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listInvite(array $where = []):Collector{
        $this->select('invite');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['targetId'])){
            $this->where('targetId', $this->uuid($where['targetId']));
        }
        if(isset($where['memberId'])){
            $this->where('memberId', $this->uuid($where['memberId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}