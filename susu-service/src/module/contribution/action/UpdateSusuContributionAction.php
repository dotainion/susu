<?php
namespace src\module\contribution\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\contribution\service\UpdateSusuContributionService;

class UpdateSusuContributionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UpdateSusuContributionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('paid'),
            $this->get('refunded'),
            $this->get('payout')
        );
    }
}