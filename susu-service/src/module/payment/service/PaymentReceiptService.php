<?php
namespace src\module\payment\service;

use src\infrastructure\Service;
use src\module\payment\factory\IntentFactory;
use tools\infrastructure\Assert;
use tools\stripe\StripePayment;

class PaymentReceiptService extends Service{
    protected StripePayment $payment;
    protected IntentFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->payment = new StripePayment();
        $this->factory = new IntentFactory();
    }
    
    public function process(string $paymentIntentId){
        Assert::stringNotEmpty($paymentIntentId, 'Payment details not found.');

        $paymentIntent = $this->payment->paymentIntent($paymentIntentId);
        $intent = $this->factory->mapToPaymentIntent($paymentIntent);

        $this->setOutput($intent);
        return $this;
    }
}