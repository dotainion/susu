<?php
namespace src\module\schedule\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\schedule\factory\ScheduleFactory;
use src\module\susu\objects\Cycle;
use src\module\susu\objects\Susu;

class CalculateSchedule{

    private Susu $susu;
    private Collector $members;
    protected ScheduleFactory $factory;

    public function __construct(Susu $susu, Collector $members) {
        $this->susu = $susu;
        $this->members = $members;
        $this->factory = new ScheduleFactory();
    }

    private function payoutDate($memberIndex):DateHelper{
        $dateHelper = clone $this->susu->startDate(); // Use startDate from Susu
        $intervalSpec = $this->getInterval($this->susu);
        list($intervalValue, $intervalUnit) = explode(' ', $intervalSpec);

        switch ($intervalUnit) {
            case 'weeks':
                $dateHelper->addDays(7 * $intervalValue * $memberIndex);
                break;
            case 'months':
                for ($i = 0; $i < $intervalValue * $memberIndex; $i++) {
                    $dateHelper->addDays($dateHelper->daysInMonth());
                }
                break;
            default:
                throw new InvalidArgumentException("Unsupported interval unit: {$intervalUnit}");
        }

        return $dateHelper;
    }

    private function getInterval(Susu $susu) {
        switch ($susu->cycle()) {
            case Cycle::Weekly:
                return '1 weeks';
            case Cycle::BiWeekly:
                return '2 weeks';
            case Cycle::Monthly:
                return '1 months';
            case Cycle::BiMonthly:
                return '2 months';
            default:
                throw new InvalidArgumentException("Unknown cycle type: {$susu->cycle()}");
        }
    }

    private function calculate(int $accurance) {
        for ($position = 1; $position <= $this->members->count(); $position++) {
            $schedule = $this->factory->mapResult([
                'id' => (new Id())->new()->toString(),
                'memberId' => null,
                'date' => $this->payoutDate($position)->toString(),
                'position' => $position,
                'susuId' => $this->susu->id()->toString(),
                'accurance' => $accurance
            ]);
            $this->factory->add($schedule);
        }
    }

    private function buildAccurances():void{
        for ($accurance = 1; $accurance <= $this->susu->accurance(); $accurance++) {
            $this->calculate($accurance);
        }
    }

    public function schedules():Collector {
        $this->buildAccurances();
        return $this->factory;
    }
}