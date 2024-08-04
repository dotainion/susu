<?php
namespace src\module\schedule\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\schedule\logic\ListSchedule;
use src\module\user\logic\ListUsers;

class ListScheduleService extends Service{
    protected ListUsers $users;
    protected ListSchedule $schedule;

    public function __construct(){
        parent::__construct(false);
        $this->users = new ListUsers();
        $this->schedule = new ListSchedule();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Schedule not found.');

        $collector = $this->schedule->bySusuId(new Id($susuId));
        $collector->assertHasItem('Schedule not found.');    


        $userIdArray = [];
        foreach($collector->list() as $schedule){
            if($schedule->memberId() !== null){
                $userIdArray[] = $schedule->memberId();
            }
        }
        $users = $this->users->usersByIdArray($userIdArray);

        foreach($collector->list() as $schedule){
            foreach($users->list() as $user){
                if($schedule->memberId() !== null && $schedule->memberId()->toString() === $user->id()->toString()){
                    $schedule->setUser($user);
                }
            }
        }

        
        $this->setOutput($schedule->schedules());
        return $this;
    }
}