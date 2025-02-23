<?php
namespace src\module\refund\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\refund\service\ListSusuRefundService;

class ListSusuRefundAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListSusuRefundService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'),
            $this->get('memberId')
        );
    }
}