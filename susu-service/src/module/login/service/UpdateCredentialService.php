<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\infrastructure\Assert;
use tools\SecurityTools;

class UpdateCredentialService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct();
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $password, $currentPassword){
        Assert::validUuid($id, 'User not found.');

        $service = $this->secure->updateCredential($id, $password, $currentPassword);

        return $this->mergeOutput($service);
    }
}