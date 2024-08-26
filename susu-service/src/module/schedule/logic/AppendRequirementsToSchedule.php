<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\user\logic\ListUsers;

class AppendRequirementsToSchedule{

    const PAYOUT = 'PAYOUT';
    const CONTRIBUTION = 'CONTRIBUTION';
    protected ListUsers $users;

    public function users(Collector &$schedules, Collector $users):Collector{
        foreach($schedules->list() as $schedule){
            foreach($users->list() as $user){
                if($schedule->memberId() !== null && $schedule->memberId()->toString() === $user->id()->toString()){
                    $schedule->setUser($user);
                }
            }
        }
        return $schedules;
    }

    private function appendPayments(Collector &$schedules, Collector &$payments, Collector &$users, string $CMD):Collector{        
        foreach($schedules->list() as $schedule){
            $payoutCollector = new Collector();
            $contributionCollector = new Collector();
            foreach($payments->list() as $payment){
                if(
                    $schedule->memberId()->toString() === $payment->memberId()->toString() && 
                    $schedule->id()->toString() === $schedule->scheduleId()->toString()
                ){
                    foreach($users->list() as $user){
                        if($payment->memberId()->toString() === $user->id()->toString()){
                            $payment->setUser($user);
                            break;
                        }
                    }
                    ($CMD === AppendRequirementsToSchedule::PAYOUT) && $payoutCollector->add($payment);
                    ($CMD === AppendRequirementsToSchedule::CONTRIBUTION) && $contributionCollector->add($payment);
                }
            }
            ($CMD === AppendRequirementsToSchedule::PAYOUT) && $schedule->setPayouts($payoutCollector);
            ($CMD === AppendRequirementsToSchedule::CONTRIBUTION) && $schedule->setContributions($contributionCollector);
        }
        return $schedules;
    }

    public function payouts(Collector &$schedules, Collector &$payments, Collector &$users):Collector{
        return $this->appendPayments($schedules, $payments, $users, AppendRequirementsToSchedule::PAYOUT);
    }

    public function contributions(Collector &$schedules, Collector &$payments, Collector &$users):Collector{
        return $this->appendPayments($schedules, $payments, $users, AppendRequirementsToSchedule::CONTRIBUTION);
    }
}