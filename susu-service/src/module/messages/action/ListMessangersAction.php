<?php
namespace src\module\messages\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\messages\service\ListMessangersService;

class ListMessangersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListMessangersService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('memberId')
        );
    }
}