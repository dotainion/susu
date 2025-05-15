<?php
namespace src\module\messages\logic;

use tools\infrastructure\Collector;
use src\module\user\logic\ListUsers;
use src\module\user\objects\User;

class AppendMessageUsers{
    protected ListUsers $users;

    public function __construct(){
        $this->users = new ListUsers();
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

        $users = $this->users->usersByIdArray(array_unique($collector->attrArray('fromId')));
        if(!$users->hasItem()){
            return new Collector();
        }

        foreach($collector->list() as $message){
            foreach($users->list() as $member){
                if($message->fromId()->toString() === $member->id()->toString()){
                    $message->setUser($member);
                }
            }
            if($message->fromId()->toString() === $user->id()->toString()){
                $message->setIsCurrentUser(true);
            }
        }
        return $collector;
    }
}