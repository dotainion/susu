<?php
namespace src\module\communities\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\BindMembersToCommunities;
use src\module\communities\logic\ListCommunities;

class SearchCommunitiesService extends Service{
    protected ListCommunities $communities;
    protected BindMembersToCommunities $bind;

    public function __construct(){
        parent::__construct();
        $this->communities = new ListCommunities();
        $this->bind = new BindMembersToCommunities();
    }
    
    public function process($value){
        $value = trim($value);
        if((new Id())->isValid($value)){
            $collector = $this->communities->byIdArray([new Id($value)]);
        }else{
            $collector = $this->communities->byName($value);
        }

        $this->bind->bindRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}