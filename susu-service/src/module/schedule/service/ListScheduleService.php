<?php
namespace src\module\schedule\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\ListContribution;
use src\module\payout\logic\ListPayout;
use src\module\refund\logic\ListRefund;
use src\module\schedule\logic\AppendRequirementsToSchedule;
use src\module\schedule\logic\ListSchedule;
use src\module\susu\logic\FetchSusu;
use src\module\user\logic\ListUsers;

class ListScheduleService extends Service{
    protected FetchSusu $susu;
    protected ListUsers $user;
    protected ListSchedule $schedule;
    protected ListPayout $payout;
    protected ListRefund $refund;
    protected ListContribution $contribution;
    protected AppendRequirementsToSchedule $append;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->user = new ListUsers();
        $this->schedule = new ListSchedule();
        $this->payout = new ListPayout();
        $this->refund = new ListRefund();
        $this->contribution = new ListContribution();
        $this->append = new AppendRequirementsToSchedule();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Schedule not found.');

        $susuCollector = $this->susu->byId(new Id($susuId));
        if(!$susuCollector->hasItem()){
            //this can be a group or susu id.
            $susuCollector = $this->susu->activeByGroupId(new Id($susuId));
        }

        $susuCollector->assertHasItem('Susu not found.');
        $susu = $susuCollector->first();

        $collector = $this->schedule->bySusuId($susu->id());
        $collector->assertHasItem('Schedule not found.');

        $userIdArray = [];
        foreach($collector->list() as $sch){
            ($sch->memberId() !== null) && $userIdArray[] = $sch->memberId();
        }

        $users = $this->user->usersByIdArray($userIdArray);
        $payouts = $this->payout->bySusuId($susu->id());
        $refunds = $this->refund->bySusuId($susu->id());
        $contributions = $this->contribution->bySusuId($susu->id());

        $this->append->users($collector, $users);
        $this->append->payouts($collector, $payouts, $users);
        $this->append->refunds($collector, $refunds, $users);
        $this->append->contributions($collector, $contributions, $users);

        $this->setOutput($collector);
        return $this;
    }
}