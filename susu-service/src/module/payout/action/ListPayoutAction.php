<?php
namespace src\module\payout\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\payout\service\ListPayoutService;

class ListPayoutAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListPayoutService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId')
        );
    }
}