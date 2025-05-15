<?php
namespace src\module\posts\action;

use src\module\posts\service\SetReactionService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class SetReactionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetReactionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('targetId'),
            $this->get('communityId'),
            $this->get('like')
        );
    }
}