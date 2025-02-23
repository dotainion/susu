<?php
namespace src\module\payment\factory;

use src\module\payment\objects\PaymentType;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use Stripe\PaymentIntent;

class PaymentTypeFactory extends Collector{
    protected ChargeFactory $factory;

    use Factory;

    public function __construct(){
        $this->factory = new ChargeFactory();
    }

    public function mapFromPaymentIntent(PaymentIntent $paymentIntent):self{
        foreach($paymentIntent->payment_method_types ?? [] as $type){
            $this->add(new PaymentType((string)$type));
        }
        return $this;
    }
}