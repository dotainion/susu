<?php
namespace src\module\messages\logic;

use src\infrastructure\Collector;
use src\module\user\logic\ListUsers;
use src\module\user\objects\User;

class AppendMessageUsers{
    protected ListUsers $users;

    public function __construct(){
        $this->users = new ListUsers();
    }

    public function appendUsers(Collector &$messages, User $user):Collector{
        $users = $this->users->usersByIdArray(array_unique($messages->attrArray('fromId')));

        if(!$users->hasItem()){
            return new Collector();
        }

        foreach($messages->list() as $message){
            foreach($users->list() as $member){
                if($message->fromId()->toString() === $member->id()->toString()){
                    $message->setUser($member);
                }
            }
            if($message->fromId()->toString() === $user->id()->toString()){
                $message->setIsCurrentUser(true);
            }
        }
        return $messages;
    }
}