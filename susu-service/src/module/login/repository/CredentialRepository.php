<?php
namespace src\module\login\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\ICredential;
use src\infrastructure\Id;
use src\infrastructure\Password;
use src\infrastructure\Token;
use src\module\login\factory\CredentialFactory;

class CredentialRepository extends Repository{
    protected CredentialFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new CredentialFactory();
    }
    
    public function create(ICredential $creds):void{
        $this->insert('credential')        
            ->add('id', $this->uuid($creds->id()))
            //->add('expire', $creds->expire())
            ->add('token', $creds->token()->toString());
            //->add('refreshToken', $creds->refreshToken());
        if($creds->password()->hasPassword()){
            $this->add('password', $creds->password()->toHash());
        }
        $this->execute();
    }
    
    public function editPassword(Id $id, Password $password, Password $newPassword):void{
        $this->update('credential')        
            ->set('password', $newPassword->toHash())
            ->where('id', $this->uuid($id))
            ->where('password', $password->toHash());
        $this->execute();
    }
    
    public function updatePasswordByRefreshToken(Id $id, Password $password, Token $token):void{
        $this->update('credential')        
            ->set('password', $password->toHash())
            ->where('id', $this->uuid($id))
            ->where('refreshToken', $token);
        $this->execute();
    }
    
    public function unsetTokenRefreshToken(Id $id, Token $token):void{
        $this->update('credential')        
            ->set('refreshToken', '')
            ->where('id', $this->uuid($id))
            ->where('refreshToken', $token);
        $this->execute();
    }
    
    public function listHasCredential(array $where):Collector{
        $this->select('credential')
            ->innerJoin('user', 'id', 'credential', 'id')
            ->where('hide', 0, 'user');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['password'])){
            $this->where('password', $where['password']);
        }
        if(isset($where['refreshToken'])){
            $this->where('refreshToken', $where['refreshToken']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}