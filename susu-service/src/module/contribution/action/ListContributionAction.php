<?php
namespace src\module\contribution\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\contribution\service\ListContributionService;

class ListContributionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListContributionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId')
        );
    }
}