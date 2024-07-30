<?php
namespace src\module\history\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\history\logic\ListHistory;

class ListSusuHistoryService extends Service{
    protected ListHistory $history;

    public function __construct(){
        parent::__construct(false);
        $this->history = new ListHistory();
    }
    
    public function process($susuId, $memberId){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $collector = $this->history->history(new Id($susuId), new Id($memberId));
        $collector->assertHasItem('No history.');

        $this->setOutput($collector);
        return $this;
    }
}