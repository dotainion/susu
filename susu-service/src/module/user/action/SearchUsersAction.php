<?php
namespace src\module\user\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\user\service\SearchUsersService;

class SearchUsersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SearchUsersService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('value')
        );
    }
}