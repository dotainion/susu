<?php
namespace src\module\messages\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\messages\service\ListGroupMessagesService;

class ListGroupMessagesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListGroupMessagesService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('groupId'),
            $this->get('read')
        );
    }
}