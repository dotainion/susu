<?php
namespace src\module\invites\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\invites\service\SetInviteService;

class SetInviteAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetInviteService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('memberId'),
            $this->get('targetId'),
            $this->get('isSusu')
        );
    }
}