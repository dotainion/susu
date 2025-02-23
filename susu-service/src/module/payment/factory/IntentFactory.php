<?php
namespace src\module\payment\factory;

use src\module\payment\objects\Intent;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use Stripe\PaymentIntent;

class IntentFactory extends Collector{
    protected ChargeFactory $chargeFactory;
    protected PaymentTypeFactory $paymentTypeFactory;

    use Factory;

    public function __construct(){
        $this->chargeFactory = new ChargeFactory();
        $this->paymentTypeFactory = new PaymentTypeFactory();
    }

    public function mapToPaymentIntent(PaymentIntent $paymentIntent):Intent{
        return new Intent(
            (string)$paymentIntent->id,
            (float)$paymentIntent->amount,
            (float)$paymentIntent->amount_received / 100,
            (string)$paymentIntent->currency,
            (string)$paymentIntent->status,
            (string)$paymentIntent->description,
            (string)$paymentIntent->client_secret,
            (string)$paymentIntent->receip_email,
            (string)date('Y-m-d H:i:s', $paymentIntent->created),
            $this->paymentTypeFactory->mapFromPaymentIntent($paymentIntent),
            $this->chargeFactory->mapFromPaymentIntent($paymentIntent)
        );
    }
}