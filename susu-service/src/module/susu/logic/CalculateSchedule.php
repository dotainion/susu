<?php
namespace src\module\susu\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\susu\factory\ScheduleFactory;
use src\module\susu\objects\Susu;
use src\module\user\objects\User;

class CalculateSchedule{

    private Susu $susu;
    private Collector $members;
    private Collector $susuLinks;
    protected ScheduleFactory $factory;

    public function __construct(Susu $susu, Collector $members, Collector $susuLinks) {
        $this->susu = $susu;
        $this->members = $members;
        $this->susuLinks = $susuLinks;
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
            case 'Weekly':
                return '1 weeks';
            case 'Bi-Weekly':
                return '2 weeks';
            case 'Monthly':
                return '1 months';
            case 'Bi-Monthly':
                return '2 months';
            default:
                throw new InvalidArgumentException("Unknown cycle type: {$susu->cycle()}");
        }
    }

    private function findMember(int $position):?User{
        foreach ($this->susuLinks->list() as $link) {
            if($link->position() === $position){
                foreach ($this->members->list() as $member) {
                    if($link->memberId()->toString() === $member->id()->toString() && $link->position() === $position){
                        return $member;
                    }
                }
                break;
            }
        }
        return null;
    }

    private function calculate() {
        foreach ($this->members->list() as $index => $member) {
            $position = ($index + 1);
            $schedule = $this->factory->mapResult([
                'id' => (new Id())->new()->toString(),
                'date' => $this->payoutDate($position)->toString(),
                'position' => $position,
                'user' => $this->findMember($position),
            ]);
            $this->factory->add($schedule);
        }
    }

    public function schedules():Collector {
        $this->calculate();
        return $this->factory;
    }
}