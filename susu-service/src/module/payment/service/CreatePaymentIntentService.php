<?php
namespace src\module\payment\service;

use src\infrastructure\Service;
use src\module\payment\factory\CustomerFactory;
use src\module\payment\factory\IntentFactory;
use src\module\user\logic\FetchUser;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use tools\stripe\StripeCustomer;
use tools\stripe\StripePayment;

class CreatePaymentIntentService extends Service{
    protected FetchUser $user;
    protected StripeCustomer $customer;
    protected StripePayment $payment;
    protected IntentFactory $factory;
    protected CustomerFactory $convert;

    public function __construct(){
        parent::__construct();
        $this->user = new FetchUser();
        $this->customer = new StripeCustomer();
        $this->payment = new StripePayment();
        $this->factory = new IntentFactory();
        $this->convert = new CustomerFactory();
    }
    
    public function process(string $userId, string $currency, float $amount, ?string $paymentMethodId){
        Assert::validUuid($userId, 'Member not found.');

        $collector = $this->user->user(new Id($userId));
        $collector->assertHasItem('Member not found.');
        $user = $this->convert->convertFromUser($collector->first());
        $customer = $this->customer->createCustomerIfNotExist($user);

        $paymentIntent = $this->payment->createPaymentIntent($customer, $currency, $amount, null, $paymentMethodId);
        $intent = $this->factory->mapToPaymentIntent($paymentIntent);

        $this->setOutput($intent);
        return $this;
    }
}