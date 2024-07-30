<?php
namespace src\module\history\logic;

use src\module\history\repository\HistoryRepository;
use src\module\history\objects\History;

class AddHistory{
    protected HistoryRepository $repo;

    public function __construct(){
        $this->repo = new HistoryRepository();
    }

    public function add(History $history):void{
        $this->repo->create($history);
    }
}