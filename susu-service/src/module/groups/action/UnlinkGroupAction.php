<?php
namespace src\module\groups\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\groups\service\UnlinkGroupService;

class UnlinkGroupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UnlinkGroupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('groupId'),
            $this->get('memberId')
        );
    }
}