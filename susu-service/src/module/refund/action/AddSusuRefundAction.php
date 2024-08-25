<?php
namespace src\module\refund\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\refund\service\AddSusuRefundService;

class AddSusuRefundAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new AddSusuRefundService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'),
            $this->get('memberId'),
            $this->get('amount')
        );
    }
}