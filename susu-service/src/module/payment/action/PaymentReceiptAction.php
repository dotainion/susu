<?php
namespace src\module\payment\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\payment\service\PaymentReceiptService;

class PaymentReceiptAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new PaymentReceiptService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('paymentIntentId')
        );
    }
}