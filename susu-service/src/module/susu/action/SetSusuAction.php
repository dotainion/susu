<?php
namespace src\module\susu\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\susu\service\SetSusuService;

class SetSusuAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetSusuService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('susuId'), 
            $this->get('contribution'), 
            $this->get('cycle'), 
            $this->get('accurance'), 
            $this->get('startDate'), 
            $this->get('groupId'), 
            $this->get('pendingStart'), 
            $this->get('completed'),
            $this->get('canceled')
        );
    }
}