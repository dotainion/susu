<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\user\logic\ListUsers;

class AppendUserToSchedule{

    protected ListUsers $users;

    public function appendUsers(Collector &$schedules, Collector $users):Collector{
        foreach($schedules->list() as $schedule){
            foreach($users->list() as $user){
                if($schedule->memberId() !== null && $schedule->memberId()->toString() === $user->id()->toString()){
                    $schedule->setUser($user);
                }
            }
        }
        return $schedules;
    }
}