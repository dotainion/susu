<?php
namespace src\module\messages\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\communities\logic\ListCommunities;
use src\module\messages\logic\ListMessages;
use src\module\messages\objects\Messanger;
use src\module\user\logic\ListUsers;

class ListMessangersService extends Service{
    protected ListUsers $users;
    protected ListCommunities $communities;
    protected ListMessages $messages;

    public function __construct(){
        parent::__construct();
        $this->users = new ListUsers();
        $this->communities = new ListCommunities();
        $this->messages = new ListMessages();
    }
    
    public function process($memberId){
        Assert::validUuid($memberId, 'Member not found.');

        $messages = $this->messages->conversationByOwnerId(new Id($memberId));
        $memberIdArray = array_map(fn($msg)=>$msg->toId(), $messages->list());
        $memberIdArray2 = array_map(fn($msg)=>$msg->fromId(), $messages->list());
        $uniqueMemberIdArray = array_unique([...$memberIdArray, ...$memberIdArray2]);
        $collector = $this->users->usersByIdArray($uniqueMemberIdArray);
        $communitiesCollector = $this->communities->byIdArray($uniqueMemberIdArray);

        $messageArray = $messages->list();
        usort($messageArray, function($a, $b) {
            return strtotime($b->date()->toString()) - strtotime($a->date()->toString());
        });

        $users = new Collector();
        $memberIdIncludedArray = [];
        //this is to add users from first to last based on the messages date
        foreach($messageArray as $message){
            if(!in_array($message->toId()->toString(), $memberIdIncludedArray)){
                $memberIdIncludedArray[] = $message->toId()->toString();

                $found = false;
                foreach($collector->list() as $member){
                    if($member->id()->toString() === $this->user()->id()->toString()){
                        continue;
                    }
                    if($member->id()->toString() === $message->toId()->toString()){
                        $users->add($member);
                        $found = true;
                        break;
                    }
                }

                if($found){
                    continue;
                }

                foreach($communitiesCollector->list() as $community){
                    if($community->id()->toString() === $message->toId()->toString()){
                        $users->add($community);
                        break;
                    }
                }
            }
        }

        $collector = new Collector();
        foreach($users->list() as $user){
            $messanger = new Messanger();
            $messanger->setUser($user);

            $msgCollector = new Collector();
            foreach($messages->list() as $message){
                if($user->id()->toString() === $message->fromId()->toString()){
                    $msgCollector->add($message);
                }
            }

            $messanger->setMessages($msgCollector);
            $collector->add($messanger);
        }

        $this->setOutput($collector);
        return $this;
    }
}