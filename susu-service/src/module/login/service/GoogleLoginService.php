<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\security\SecurityManager;

class GoogleLoginService extends Service{
    protected SecurityManager $security;

    public function __construct(){
        parent::__construct(false);
        $this->security = new SecurityManager();
    }
    
    public function process($accessToken){
        
        $this->security->googleLogin($accessToken);
        
        $this->setOutput($this->security->user());
        
        return $this;
    }
}