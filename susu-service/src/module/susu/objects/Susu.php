<?php
namespace src\module\susu\objects;

use InvalidArgumentException;
use ReflectionClass;
use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\IUser;

class Susu implements IObjects{
    protected Id $id;
    protected string $contribution;
    protected string $cycle;
    protected int $accurance;
    protected DateHelper $startDate;
    protected Id $groupId;
    protected bool $pendingStart;
    protected bool $completed;
    protected bool $canceled;
    protected ?Collector $members = null;
    protected ?IUser $owner = null;

    public function __construct(){
        $this->id = new Id();
        $this->groupId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function pendingStart():bool{
        return $this->pendingStart;
    }

    public function members():?Collector{
        return $this->members;
    }

    public function owner():?IUser{
        return $this->owner;
    }

    public function canceled():bool{
        return $this->canceled;
    }

    public function completed():bool{
        return $this->completed;
    }

    public function contribution():string{
        return $this->contribution;
    }

    public function cycle():string{
        return $this->cycle;
    }

    public function accurance():int{
        return $this->accurance;
    }

    public function startDate():DateHelper{
        return $this->startDate;
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setCompleted(bool $completed):void{
        $this->completed = $completed;
    }

    public function setContribution(string $contribution):void{
        Assert::validNumericValue($contribution, 'Invalid contribution value.');
        $this->contribution = $contribution;
    }

    public function setCycle(string $cycle):void{
        if(!in_array($cycle, (new ReflectionClass(new Cycle()))->getConstants())){
            throw new InvalidArgumentException('Cycle not valid for a susu.');
        }
        $this->cycle = $cycle;
    }
    
    public function setAccurance(int $accurance):void{
        Assert::validNumericValue($accurance, 'Invalid accurance value.');
        Assert::positiveNumber($accurance, 'Invalid accurance value.');
        Assert::minNumber($accurance, 1, 'Invalid accurance value.');
        $this->accurance = (int)$accurance;
    }
    
    public function setStartDate(string $startDate):void{
        Assert::validDate($startDate, 'Invalid start date.');
        $this->startDate = new DateHelper($startDate);
    }

    public function setPendingStart(bool $pendingStart):void{
        $this->pendingStart = $pendingStart;
    }

    public function setGroupId(string $groupId):void{
        $this->groupId->set($groupId);
    }

    public function setMembers(Collector $members):void{
        $this->members = $members;
    }

    public function setOwner(IUser $owner):void{
        $this->owner = $owner;
    }

    public function setCanceled(bool $canceled):void{
        $this->canceled = $canceled;
    }
}