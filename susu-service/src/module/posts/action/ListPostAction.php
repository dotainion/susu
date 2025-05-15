<?php
namespace src\module\posts\action;

use src\module\posts\service\ListPostService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class ListPostAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListPostService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('communityId')
        );
    }
}