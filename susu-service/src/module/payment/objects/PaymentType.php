<?php
namespace src\module\payment\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class PaymentType  implements IObjects{
    protected Id $id;
    protected string $type;

    public function __construct(string $type){
        $this->id = new Id();
        $this->id->new();
        $this->type = $type;
    }

    public function id():Id{
        return $this->id;
    }
    
    public function type():string{
        return $this->type;
    }
}