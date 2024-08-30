<?php
namespace src\module\schedule\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\schedule\logic\FetchSchedule;
use src\module\schedule\logic\SetSchedule;
use src\module\susu\logic\AssertUserInSusu;

class AssignScheduleService extends Service{
    protected FetchSchedule $fetch;
    protected SetSchedule $schedule;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchSchedule();
        $this->schedule = new SetSchedule();
    }
    
    public function process($assignSchedules){
        $memberIdArray = array_values($assignSchedules);
        $scheduleIdArray = array_keys($assignSchedules);

        Assert::isArray($scheduleIdArray, 'Invalid schedule identifier.');
        Assert::isArray($memberIdArray, 'Invalid member identifier.');
        Assert::validUuidArray($scheduleIdArray, 'Schedule not found.');
        Assert::validUuidArray($memberIdArray, 'Member not found.');

        $collector = $this->fetch->byIdArray($scheduleIdArray);
        if($collector->count() !== count($scheduleIdArray)){
            throw new InvalidArgumentException('Schedule not found.');
        }

        (new AssertUserInSusu())->assertUserInSusuByMemberIdArray($memberIdArray, $collector->attrArray('susuId'));

        foreach($collector->list() as $schedule){
            $memberId = $assignSchedules[$schedule->id()->toString()];
            $schedule->setMemberId($memberId);
        }
        
        $this->schedule->masSet($collector);
        
        $this->setOutput($collector);
        return $this;
    }
}