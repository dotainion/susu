<?php
namespace src\module\history\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\history\service\ListSusuHistoryService;

class ListSusuHistoryAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListSusuHistoryService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'),
            $this->get('memberId')
        );
    }
}