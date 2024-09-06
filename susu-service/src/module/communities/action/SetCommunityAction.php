<?php
namespace src\module\communities\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\communities\service\SetCommunityService;

class SetCommunityAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetCommunityService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'), 
            $this->get('name'), 
            $this->get('description'), 
            $this->get('cycle'), 
            $this->get('hide')
        );
    }
}