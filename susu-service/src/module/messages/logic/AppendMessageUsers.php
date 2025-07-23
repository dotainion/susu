<?php
namespace src\module\messages\logic;

use src\module\communities\logic\ListCommunities;
use tools\infrastructure\Collector;
use src\module\user\logic\ListUsers;
use src\module\user\objects\User;

class AppendMessageUsers{
    protected ListUsers $users;
    protected ListCommunities $communities;

    public function __construct(){
        $this->users = new ListUsers();
        $this->communities = new ListCommunities();
    }

    public function appendUsers(Collector &$messages, User $user):Collector{
        $collector = new Collector();
        $messgeIdArray = [];
        $messageList = [];
        foreach($messages->list() as $message){
            if(!in_array($message->id()->toString(), $messgeIdArray)){
                $messgeIdArray[] = $message->id()->toString();
                $messageList[] = $message;
            }
        }

        usort($messageList, function($a, $b) {
            return strtotime($a->date()->toString()) <=> strtotime($b->date()->toString());
        });

        array_map(fn($msg)=>$collector->add($msg), $messageList);

        $userIdArray = [
            ...$collector->attrArray('toId'), 
            ...$collector->attrArray('fromId')
        ];
        $users = $this->users->usersByIdArray(array_unique($userIdArray));
        if(!$users->hasItem()){
            return new Collector();
        }

        foreach($collector->list() as $message){
            foreach($users->list() as $member){
                if($message->fromId()->toString() === $member->id()->toString()){
                    $message->setUser($member);
                    break;
                }
            }
        }
        $communities = $this->communities->byIdArray($collector->attrArray('toId'));
        foreach($collector->list() as $message){
            foreach($communities->list() as $community){
                if($community->id()->toString() === $message->toId()->toString()){
                    $message->setFromCommunity(true);
                    break;
                }
            }
        }
        return $collector;
    }
}