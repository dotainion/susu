<?php
namespace src\module\groups\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\groups\service\ListGroupsService;

class ListGroupsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListGroupsService();
    }

    public function execute(){
        return $this->service->process();
    }
}