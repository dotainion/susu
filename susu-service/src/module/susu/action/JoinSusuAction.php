<?php
namespace src\module\susu\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\susu\service\JoinSusuService;

class JoinSusuAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new JoinSusuService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('memberId'),
            $this->get('groupId')
        );
    }
}