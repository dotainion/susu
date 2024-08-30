<?php
namespace src\module\schedule\logic;

use src\infrastructure\Collector;
use src\module\user\logic\ListUsers;

class AppendRequirementsToSchedule{

    const PAYOUT = 'PAYOUT';
    const REFUND = 'REFUND';
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
            $paymentCollector = new Collector();
            foreach($payments->list() as $payment){
                if($schedule->memberId() !== null && $schedule->memberId()->toString() === $payment->memberId()->toString()){
                    foreach($users->list() as $user){
                        if($payment->memberId()->toString() === $user->id()->toString()){
                            $payment->setUser($user);
                            break;
                        }
                    }
                    $paymentCollector->add($payment);
                }
            }
            ($CMD === AppendRequirementsToSchedule::PAYOUT) && $schedule->setPayouts($paymentCollector);
            ($CMD === AppendRequirementsToSchedule::REFUND) && $schedule->setRefunds($paymentCollector);
            ($CMD === AppendRequirementsToSchedule::CONTRIBUTION) && $schedule->setContributions($paymentCollector);
        }
        return $schedules;
    }

    public function payouts(Collector &$schedules, Collector &$payments, Collector &$users):Collector{
        return $this->appendPayments($schedules, $payments, $users, AppendRequirementsToSchedule::PAYOUT);
    }

    public function refunds(Collector &$schedules, Collector &$payments, Collector &$users):Collector{
        return $this->appendPayments($schedules, $payments, $users, AppendRequirementsToSchedule::REFUND);
    }

    public function contributions(Collector &$schedules, Collector &$payments, Collector &$users):Collector{
        return $this->appendPayments($schedules, $payments, $users, AppendRequirementsToSchedule::CONTRIBUTION);
    }
}