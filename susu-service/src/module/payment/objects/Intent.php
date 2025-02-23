<?php
namespace src\module\payment\objects;

use src\infrastructure\StringId;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Intent  implements IObjects{
    protected StringId $id;
    protected float $amount;
    protected float $amountReceived;
    protected string $currency;
    protected string $status;
    protected string $description;
    protected string $clientSecret;
    protected string $receipEmail;
    protected DateHelper $date;
    protected Collector $paymentMethodTypes;
    protected Collector $charges;

    public function __construct(
        string $id,
        float $amount,
        float $amountReceived,
        string $currency,
        string $status,
        string $description,
        string $clientSecret,
        string $receipEmail,
        string $date,
        Collector $paymentMethodTypes,
        Collector $charges
    ){
        $this->id = new StringId($id);
        $this->amount = $amount;
        $this->amountReceived = $amountReceived;
        $this->currency = $currency;
        $this->status = $status;
        $this->description = $description;
        $this->clientSecret = $clientSecret;
        $this->receipEmail = $receipEmail;
        $this->date = new DateHelper($date);
        $this->paymentMethodTypes = $paymentMethodTypes;
        $this->charges = $charges;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function amount():float{
        return $this->amount;
    }

    public function amountReceived():float{
        return $this->amountReceived;
    }

    public function currency():string{
        return $this->currency;
    }

    public function status():string{
        return $this->status;
    }

    public function description():string{
        return $this->description;
    }

    public function clientSecret():string{
        return $this->clientSecret;
    }

    public function receipEmail():string{
        return $this->receipEmail;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function paymentMethodTypes():Collector{
        return $this->paymentMethodTypes;
    }

    public function charges():Collector{
        return $this->charges;
    }
}