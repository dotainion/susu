<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\susu\objects\Susu;
use src\module\user\logic\ListUsers;

class AppendContributionToSchedule extends AppendToScheduleControl{

    protected ListUsers $users;
    protected Collector $usersCollector;

    public function __construct() {
        $this->users = new ListUsers();
        $this->usersCollector = new Collector();
    }

    public function appendContributions(Susu $susu, Collector &$schedules, Collector &$contributions, Collector &$users):Collector{
        $this->setSusu($susu);

        foreach($schedules->list() as $schedule){
            $payoutCollector = new Collector();
            foreach($contributions->list() as $contribution){
                if($this->sameComparison($schedule, $contribution)){
                    foreach($users->list() as $user){
                        if($contribution->memberId()->toString() === $user->id()->toString()){
                            $contribution->setUser($user);
                            break;
                        }
                    }
                    $payoutCollector->add($contribution);
                }
            }
            $schedule->setContributions($payoutCollector);
        }
        return $schedules;
    }
}