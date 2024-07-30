<?php
namespace src\module\history\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Service;
use src\module\history\factory\HistoryFactory;
use src\module\history\logic\AddHistory;

class AddSusuHistoryService extends Service{
    protected AddHistory $save;
    protected HistoryFactory $factory;

    public function __construct(){
        parent::__construct(false);
        $this->save = new AddHistory();
        $this->factory = new HistoryFactory();
    }
    
    public function process($susuId, $memberId, $contribution){
        Assert::validUuid($susuId, 'Susu not found.');
        Assert::validUuid($memberId, 'Member not found.');

        $history = $this->factory->mapResult([
            'susuId' => $susuId,
            'date' => (new DateHelper())->new()->toString(),
            'memberId' => $memberId,
            'contribution' => $contribution,
        ]);

        $this->save->add($history);

        $this->setOutput($history);
        return $this;
    }
}