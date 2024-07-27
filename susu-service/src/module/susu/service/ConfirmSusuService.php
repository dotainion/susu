<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\factory\SusuFactory;
use src\module\susu\logic\FetchSusu;
use src\module\susu\logic\SetSusu;

class ConfirmSusuService extends Service{
    protected SetSusu $susu;
    protected SusuFactory $factory;
    protected FetchSusu $activeSusu;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new SetSusu();
        $this->factory = new SusuFactory();
        $this->activeSusu = new FetchSusu();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Group not found.');

        $collector = $this->activeSusu->activeByGroupId(new Id($groupId));
        $collector->assertHasItem('Susu not yet stared.');
        $susu = $collector->first();
        $susu->setPendingStart(false);
        
        $this->susu->set($susu);

        $this->setOutput($susu);
        return $this;
    }
}