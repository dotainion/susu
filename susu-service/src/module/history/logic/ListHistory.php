<?php
namespace src\module\history\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\history\repository\HistoryRepository;

class ListHistory{
    protected HistoryRepository $repo;

    public function __construct(){
        $this->repo = new HistoryRepository();
    }

    public function history(Id $susuId, Id $memberId):Collector{
        return $this->repo->listHistory([
            'susuId' => $susuId,
            'memberId' => $memberId,
            'hide' => false
        ]);
    }
}