<?php
namespace src\module\user\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\user\service\CreateUserService;

class CreateUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('name'),
            $this->get('email'),
            $this->get('phoneNumber'),
            $this->get('password'),
            $this->get('confirmPassword')
        );
    }
}