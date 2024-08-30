<?php
namespace src\module\contribution\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\contribution\service\AddSusuContributionService;

class AddSusuContributionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new AddSusuContributionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'),
            $this->get('memberId'),
            $this->get('contribution')
        );
    }
}