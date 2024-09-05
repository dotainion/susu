<?php
namespace src\module\communities\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\communities\service\ListCommunitiesService;

class ListcommunitiesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListCommunitiesService();
    }

    public function execute(){
        return $this->service->process();
    }
}