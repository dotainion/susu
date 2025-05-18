<?php
namespace src\module\invites\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
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
            ->column('id', $this->uuid($invite->id()))
            ->column('memberId', $this->uuid($invite->memberId()))
            ->column('targetId', $this->uuid($invite->targetId()))
            ->column('date', $invite->date()->toString())
            ->column('expire', $invite->expire()->toString())
            ->column('isSusu', $invite->isSusu());
        $this->execute();
    }
    
    public function edit(Invite $invite):void{
        $this->update('invite') 
            ->column('memberId', $this->uuid($invite->memberId()))  
            ->column('targetId', $this->uuid($invite->targetId()))       
            ->column('date', $invite->date()->toString())
            ->column('expire', $invite->expire())
            ->column('isSusu', $invite->isSusu())
            ->where()->eq('id', $this->uuid($invite->id()));
        $this->execute();
    }
    
    public function deleteInvite(Id $id):void{
        $this->delete('invite')
            ->where()->eq('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listInvite(array $where = []):Collector{
        $this->select('invite');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['targetId'])){
            $this->where()->eq('targetId', $this->uuid($where['targetId']));
        }
        if(isset($where['memberId'])){
            $this->where()->eq('memberId', $this->uuid($where['memberId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}