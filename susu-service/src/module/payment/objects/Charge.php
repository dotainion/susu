<?php
namespace src\module\payment\objects;

use src\infrastructure\StringId;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Charge  implements IObjects{
    protected StringId $id;
    protected float $amount;
    protected string $status;
    protected bool $captured;
    protected string $receipEmail;
    protected string $url;

    public function __construct(string $id, float $amount, string $status, bool $captured, string $receipEmail, string $url){
        $this->id = new StringId($id);
        $this->amount = $amount;
        $this->status = $status;
        $this->captured = $captured;
        $this->receipEmail = $receipEmail;
        $this->url = $url;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function amount():float{
        return $this->amount;
    }
    
    public function status():bool{
        return $this->status;
    }

    public function captured():bool{
        return $this->captured;
    }
    
    public function receipEmail():string{
        return $this->receipEmail;
    }
    
    public function url():string{
        return $this->url;
    }
}