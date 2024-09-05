<?php
namespace src\module\communities\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\communities\service\SearchCommunitiesService;

class SearchCommunitiesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SearchCommunitiesService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('value')
        );
    }
}