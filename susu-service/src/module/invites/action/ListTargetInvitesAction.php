<?php
namespace src\module\invites\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\invites\service\ListTargetInvitesService;

class ListTargetInvitesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListTargetInvitesService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('targetId')
        );
    }
}