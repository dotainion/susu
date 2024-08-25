<?php
namespace src\module\schedule\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\contribution\logic\ListContribution;
use src\module\payout\logic\ListPayout;
use src\module\schedule\logic\AppendContributionToSchedule;
use src\module\schedule\logic\AppendPayoutToSchedule;
use src\module\schedule\logic\AppendUserToSchedule;
use src\module\schedule\logic\ListSchedule;
use src\module\susu\logic\FetchSusu;
use src\module\user\logic\ListUsers;

class ListScheduleService extends Service{
    protected FetchSusu $susu;
    protected ListUsers $user;
    protected ListPayout $payout;
    protected ListContribution $contribution;
    protected ListSchedule $schedule;
    protected AppendUserToSchedule $appendUsers;
    protected AppendPayoutToSchedule $appendPayouts;
    protected AppendContributionToSchedule $appendContributions;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->user = new ListUsers();
        $this->payout = new ListPayout();
        $this->contribution = new ListContribution();
        $this->schedule = new ListSchedule();
        $this->appendUsers = new AppendUserToSchedule();
        $this->appendPayouts = new AppendPayoutToSchedule();
        $this->appendContributions = new AppendContributionToSchedule();
    }
    
    public function process($susuId){
        Assert::validUuid($susuId, 'Schedule not found.');

        $susuCollector = $this->susu->byId(new Id($susuId));
        if(!$susuCollector->hasItem()){
            //todo: this can be a group or susu id.
            $susuCollector = $this->susu->activeByGroupId(new Id($susuId));
        }

        $susuCollector->assertHasItem('Susu not found.');
        $susu = $susuCollector->first();

        $collector = $this->schedule->bySusuId($susu->id());
        $collector->assertHasItem('Schedule not found.');

        $userIdArray = [];
        foreach($collector->list() as $sch){
            if($sch->memberId() !== null){
                $userIdArray[] = $sch->memberId();
            }
        }

        $users = $this->user->usersByIdArray($userIdArray);
        $payouts = $this->payout->bySusuId($susu->id());
        $contributions = $this->contribution->bySusuId($susu->id());
        
        $this->appendUsers->appendUsers($collector, $users);
        $this->appendPayouts->appendPayouts($susu, $collector, $payouts, $users);
        $this->appendContributions->appendContributions($susu, $collector, $contributions, $users);

        $this->setOutput($collector);
        return $this;
    }
}