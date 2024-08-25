<?php
namespace src\module\payout\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\payout\service\ListSusuPayoutService;

class ListSusuPayoutAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListSusuPayoutService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'),
            $this->get('memberId')
        );
    }
}