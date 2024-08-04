<?php
namespace src\module\messages\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\messages\service\SetMessageService;

class SetMessageAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetMessageService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('fromId'),
            $this->get('toId'),
            $this->get('message'),
            $this->get('hide')
        );
    }
}