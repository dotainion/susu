<?php
namespace src\module\schedule\logic;

use src\infrastructure\DateHelper;
use src\infrastructure\Payment;
use src\module\schedule\objects\Schedule;
use src\module\susu\objects\Cycle;
use src\module\susu\objects\Susu;

class AppendToScheduleControl{

    protected ?Susu $susu;

    public function setSusu(Susu $susu) {
        $this->susu = $susu;
    }

    public function susu():Susu {
        return $this->susu;
    }

    public function sameComparison(Schedule $schedule, Payment $payment) {
        if($this->susu()->cycle() === Cycle::Weekly){
            return $this->isSameWeek($schedule->date(), $payment->date());
        }
        if($this->susu()->cycle() === Cycle::BiWeekly){
            return $this->isSameBiWeek($schedule->date(), $payment->date());
        }
        if($this->susu()->cycle() === Cycle::Monthly){
            return $this->isSameMonth($schedule->date(), $payment->date());
        }
        if($this->susu()->cycle() === Cycle::BiMonthly){
            return $this->isSameBiMonth($schedule->date(), $payment->date());
        }
    }

    private function isSameWeek(DateHelper $date1, DateHelper $date2) {
        $week1 = $date1->month();
        $week2 = $date2->month();
        $year1 = $date1->year();
        $year2 = $date2->year();
        return ($year1 === $year2 && $week1 === $week2);
    }

    private function isSameBiWeek(DateHelper $date1, DateHelper $date3) {
        $date2 = clone $date1;
        $date2->modify('+2 weeks');
        if ($date1->dateTime() > $date2->dateTime()) {
            $temp = $date1;
            $date1 = $date2;
            $date2 = $temp;
        }
        return $date3->dateTime() >= $date1->dateTime() && $date3->dateTime() <= $date2->dateTime();
    }

    private function isSameMonth(DateHelper $date1, DateHelper $date2) {
        $week1 = $date1->modify('W');
        $week2 = $date2->modify('W');
        $year1 = $date1->year();
        $year2 = $date2->year();
        return ($year1 === $year2 && $week1 === $week2);
    }

    private function isSameBiMonth(DateHelper $date1, DateHelper $date3) {
        $date2 = clone $date1;
        $date2->modify('+2 months');
        if ($date1->dateTime() > $date2->dateTime()) {
            $temp = $date1;
            $date1 = $date2;
            $date2 = $temp;
        }
        return $date3->dateTime() >= $date1->dateTime() && $date3->dateTime() <= $date2->dateTime();
    }
}