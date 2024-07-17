<?php
namespace src\module\user\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\user\service\ListUsersService;

class ListUsersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListUsersService();
    }

    public function execute(){
        return $this->service->process();
    }
}