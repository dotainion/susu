<?php
namespace src\module\groups\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\groups\service\SetGroupService;

class SetGroupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetGroupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'), 
            $this->get('name'), 
            $this->get('contribution'), 
            $this->get('description'), 
            $this->get('cycle'), 
            $this->get('payoutDate'), 
            $this->get('createdDate'),
            $this->get('hide')
        );
    }
}