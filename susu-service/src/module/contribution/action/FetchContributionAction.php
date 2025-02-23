<?php
namespace src\module\contribution\action;

use src\module\contribution\service\FetchContributionService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class FetchContributionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchContributionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('contributionId')
        );
    }
}