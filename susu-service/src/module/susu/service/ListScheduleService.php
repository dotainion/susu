<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\CalculateSchedule;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\susu\objects\Susu;
use src\module\susu\objects\SusuLink;
use src\module\user\logic\ListUsers;

class ListScheduleService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Group not found.');

        $collector = $this->susu->activeByGroupId(new Id($groupId));
        $collector->assertHasItem('Susu not yet stared.');
        $susu = $collector->first();
    

        $links = $this->links->links(new Id($groupId));
        $userIdArray = array_map(fn($us) => $us->memberId(), $links->list());
        $users = $this->users->usersByIdArray($userIdArray);

        $schedule = new CalculateSchedule($susu, $users, $links);
        
        $this->setOutput($schedule->schedules());
        return $this;
    }
}