<?php
namespace src\module\schedule\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\schedule\service\SelectScheduleService;

class SelectScheduleAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SelectScheduleService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('memberId')
        );
    }
}