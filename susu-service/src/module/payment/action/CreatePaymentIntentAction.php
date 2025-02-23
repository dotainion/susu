<?php
namespace src\module\payment\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\payment\service\CreatePaymentIntentService;

class CreatePaymentIntentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreatePaymentIntentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('currency'),
            $this->get('amount'),
            $this->get('paymentMethodId')
        );
    }
}