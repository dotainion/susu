<?php
namespace src\module\schedule\logic;

use InvalidArgumentException;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\module\schedule\factory\ScheduleFactory;
use src\module\susu\objects\Cycle;
use src\module\susu\objects\Susu;

class CalculateSchedule
{
    private Susu $susu;
    private Collector $members;
    protected ScheduleFactory $scheduleCollector;

    public function __construct(Susu $susu, Collector $members){
        $this->susu = $susu;
        $this->members = $members;
        $this->scheduleCollector = new ScheduleFactory();
    }

    private function payoutDate(int $memberIndex): DateHelper{
        $dateHelper = clone $this->susu->startDate();
        [$intervalValue, $intervalUnit] = $this->getInterval($this->susu);

        switch ($intervalUnit) {
            case 'weeks':
                $dateHelper->addDays(7 * $intervalValue * $memberIndex);
                break;

            case 'months':
                // If DateHelper supports addMonths, use that. Otherwise use fallback:
                for ($i = 0; $i < $intervalValue * $memberIndex; $i++) {
                    $dateHelper->addDays($dateHelper->daysInMonth());
                }
                break;

            default:
                throw new InvalidArgumentException("Unsupported interval unit: {$intervalUnit}");
        }

        return $dateHelper;
    }

    private function getInterval(Susu $susu): array{
        return match ($susu->cycle()) {
            Cycle::Weekly    => [1, 'weeks'],
            Cycle::BiWeekly  => [2, 'weeks'],
            Cycle::Monthly   => [1, 'months'],
            Cycle::BiMonthly => [2, 'months'],
            default          => throw new InvalidArgumentException("Unknown cycle type: {$susu->cycle()}"),
        };
    }

    private function calculate(int $accurance): void{
        for ($index = 0; $index < $this->members->count(); $index++) {
            $schedule = $this->scheduleCollector->mapResult([
                'id'        => (new Id())->new()->toString(),
                'memberId'  => null,
                'date'      => $this->payoutDate($index)->toString(),
                'position'  => $index + 1,
                'susuId'    => $this->susu->id()->toString(),
                'accurance' => $accurance
            ]);

            $this->scheduleCollector->add($schedule);
        }
    }

    private function buildAccurances(): void{
        for ($accurance = 1; $accurance <= $this->susu->accurance(); $accurance++) {
            $this->calculate($accurance);
        }
    }

    public function schedules(): Collector{
        $this->buildAccurances();
        return $this->scheduleCollector;
    }
}