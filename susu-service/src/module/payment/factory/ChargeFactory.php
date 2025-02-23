<?php
namespace src\module\payment\factory;

use src\module\payment\objects\Charge;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use Stripe\PaymentIntent;

class ChargeFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapFromPaymentIntent(PaymentIntent $paymentIntent):self{
        foreach($paymentIntent->charges->data ?? [] as $charge){
            $this->add(
                new Charge(
                    (string)$charge->id, 
                    (float)$charge->amount, 
                    (string)$charge->status, 
                    (bool)$charge->captured, 
                    (string)$charge->receipEmail,
                    (string)$charge->receipt_url
                )
            );
        }
        return $this;
    }
}