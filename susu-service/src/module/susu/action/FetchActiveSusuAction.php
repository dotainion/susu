<?php
namespace src\module\susu\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\susu\service\FetchActiveSusuService;

class FetchActiveSusuAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchActiveSusuService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('communityId')
        );
    }
}