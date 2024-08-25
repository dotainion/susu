<?php
namespace src\module\schedule\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\schedule\service\ListScheduleService;

class ListScheduleAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListScheduleService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId')
        );
    }
}