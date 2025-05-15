<?php
namespace src\module\posts\action;

use src\module\posts\service\SetPostService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class SetPostAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetPostService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('parentId'),
            $this->get('contents'),
            $this->get('communityId')
        );
    }
}