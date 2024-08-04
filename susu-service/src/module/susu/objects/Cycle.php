<?php
namespace src\module\susu\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Cycle implements IObjects{
    const Weekly = 'Weekly';
    const BiWeekly = 'Bi-Weekly';
    const Monthly = 'Monthly';
    const BiMonthly = 'Bi-Monthly';

    protected string $cycle;

    public function __construct(?string $cycle=null){
        ($cycle !== null) && $this->setCycle($cycle);
    }

    public function id():IId{
        return (new Id())->new();
    }

    public function cycle():string{
        return $this->cycle;
    }

    public function setCycle(string $cycle):void{
        $this->cycle = $cycle;
    }
}