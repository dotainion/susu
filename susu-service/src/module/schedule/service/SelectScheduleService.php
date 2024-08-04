<?php
namespace src\module\schedule\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\schedule\logic\FetchSchedule;
use src\module\schedule\logic\SetSchedule;

class SelectScheduleService extends Service{
    protected FetchSchedule $fetch;
    protected SetSchedule $schedule;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchSchedule();
        $this->schedule = new SetSchedule();
    }
    
    public function process($id, $memberId){
        Assert::validUuid($id, 'Schedule not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->fetch->byId(new Id($id));
        $collector->assertHasItem('Schedule not found.');
        $schedule = $collector->first();

        if($schedule->memberId() !== null && $schedule->memberId()->toString() === $memberId){
            throw new InvalidArgumentException('You are already been assign to the schedule '.$schedule->date()->toString());
        }
        if($schedule->memberId() !== null){
            throw new InvalidArgumentException('Member already assign to the schedule '.$schedule->date()->toString());
        }

        $schedule->setMemberId($memberId);

        $this->schedule->set($schedule);
        
        $this->setOutput($schedule);
        return $this;
    }
}