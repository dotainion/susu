<?php
namespace src\module\susu\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\susu\logic\FetchSusu;

class FetchActiveSusuService extends Service{
    protected FetchSusu $susu;

    public function __construct(){
        parent::__construct(false);
        $this->susu = new FetchSusu();
    }
    
    public function process($groupId){
        Assert::validUuid($groupId, 'Ground not found.');

        $collector = $this->susu->activeByGroupId(new Id($groupId));
        $collector->assertHasItem('No active susu found.');

        $this->setOutput($collector);
        return $this;
    }
}