<?php
namespace src\module\schedule\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\schedule\logic\CalculateSchedule;
use src\module\schedule\logic\SetSchedule;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\ListSusuLink;
use src\module\user\logic\ListUsers;

class GenerateAndSaveScheduleService extends Service{
    protected FetchSusu $susu;
    protected ListSusuLink $links;
    protected ListUsers $users;
    protected SetSchedule $schedule;

    public function __construct(){
        parent::__construct();
        $this->susu = new FetchSusu();
        $this->links = new ListSusuLink();
        $this->users = new ListUsers();
        $this->schedule = new SetSchedule();
    }
    
    public function process($communityId){
        Assert::validUuid($communityId, 'Community not found.');

        $collector = $this->susu->activeByCommunityId(new Id($communityId));
        $collector->assertHasItem('Susu not yet stared.');
        $susu = $collector->first();
    
        $links = $this->links->links($susu->id());
        $userIdArray = array_map(fn($us) => $us->memberId(), $links->list());
        $users = $this->users->usersByIdArray($userIdArray);

        if($users->count() < 2){
            throw new InvalidArgumentException('A susu must have a minimum of two members join before it can be confirmed. Current members: ('.$users->count().')');
        }

        $generator = new CalculateSchedule($susu, $users);

        $scheduleCollector = $generator->schedules();
        foreach($scheduleCollector->list() as $schedule){
            $this->schedule->set($schedule);
        }
        
        $this->setOutput($scheduleCollector);
        return $this;
    }
}