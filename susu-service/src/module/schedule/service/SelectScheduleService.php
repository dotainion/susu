<?php
namespace src\module\schedule\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\schedule\logic\FetchSchedule;
use src\module\schedule\logic\SetSchedule;
use src\module\susu\logic\AssertUserInSusu;
use src\module\susu\logic\FetchSusu;

class SelectScheduleService extends Service{
    protected FetchSchedule $fetch;
    protected SetSchedule $schedule;
    protected FetchSusu $susu;
    protected AssertUserInSusu $assert;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchSchedule();
        $this->schedule = new SetSchedule();
        $this->susu = new FetchSusu();
        $this->assert = new AssertUserInSusu();
    }
    
    public function process($id, $memberId){
        Assert::validUuid($id, 'Schedule not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->fetch->byMemberId(new Id($memberId));
        $collector->assertItemNotExist('You already been assign to a schedule.');

        $collector = $this->fetch->byId(new Id($id));
        $collector->assertHasItem('Schedule not found.');
        $schedule = $collector->first();

        if($schedule->memberId() !== null && $schedule->memberId()->toString() === $memberId){
            throw new InvalidArgumentException('You are already been assign to the schedule '.$schedule->date()->toString());
        }
        if($schedule->memberId() !== null){
            throw new InvalidArgumentException('A member already assign to the schedule '.$schedule->date()->toString());
        }

        $susuCollector = $this->susu->byId($schedule->susuId());
        $susuCollector->assertHasItem('Please start a susu before setting a schedule.');
        $susu = $susuCollector->first();

        if(!$susu->pendingStart() && !$susu->canceled()){
            throw new InvalidArgumentException('You cannot assign schedule on a active susu.');
        }

        $this->assert->assertUserInSusu(new Id($memberId), $schedule->susuId(), 'ou cannot join a susu that is already in progress.');

        $schedule->setMemberId($memberId);

        $this->schedule->set($schedule);
        
        $this->setOutput($schedule);
        return $this;
    }
}