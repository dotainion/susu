<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\susu\objects\Susu;
use src\module\user\logic\ListUsers;

class AppendPayoutToSchedule extends AppendToScheduleControl{

    protected ListUsers $users;
    protected Collector $usersCollector;

    public function __construct() {
        $this->users = new ListUsers();
        $this->usersCollector = new Collector();
    }

    public function appendPayouts(Susu $susu, Collector &$schedules, Collector &$payouts, Collector &$users):Collector{
        $this->setSusu($susu);
        
        foreach($schedules->list() as $schedule){
            $payoutCollector = new Collector();
            foreach($payouts->list() as $payout){
                if($this->sameComparison($schedule, $payout)){
                    foreach($users->list() as $user){
                        if($payout->memberId()->toString() === $user->id()->toString()){
                            $payout->setUser($user);
                            break;
                        }
                    }
                    $payoutCollector->add($payout);
                }
            }
            $schedule->setPayouts($payoutCollector);
        }
        return $schedules;
    }
}