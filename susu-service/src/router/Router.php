<?php
namespace src\router;

use InvalidArgumentException;
use src\database\Repository;
use src\infrastructure\Https;
use src\module\communities\action\FetchCommunityAction;
use src\module\communities\action\JoinCommunityAction;
use src\module\communities\action\ListCommunitiesAction;
use src\module\communities\action\MemberCommunitiesAction;
use src\module\communities\action\OwnerCommunitiesAction;
use src\module\communities\action\SetCommunityAction;
use src\module\contribution\action\AddSusuContributionAction;
use src\module\contribution\action\ListContributionAction;
use src\module\contribution\action\ListSusuContributionAction;
use src\module\communities\action\SearchCommunitiesAction;
use src\module\communities\action\UnlinkCommunityAction;
use src\module\invites\action\DeleteInviteAction;
use src\module\invites\action\ListMemberInvitesAction;
use src\module\invites\action\ListTargetInvitesAction;
use src\module\invites\action\SetInviteAction;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\GoogleLoginAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\messages\action\ListConversationAction;
use src\module\messages\action\ListCommunityMessagesAction;
use src\module\messages\action\ListMessangersAction;
use src\module\messages\action\ListUnSeenMessagesAction;
use src\module\messages\action\SearchMessangerAction;
use src\module\messages\action\SetMessageAction;
use src\module\payout\action\AddSusuPayoutAction;
use src\module\payout\action\ListPayoutAction;
use src\module\payout\action\ListSusuPayoutAction;
use src\module\refund\action\AddSusuRefundAction;
use src\module\refund\action\ListRefundAction;
use src\module\refund\action\ListSusuRefundAction;
use src\module\schedule\action\AssignScheduleAction;
use src\module\susu\action\ConfirmSusuAction;
use src\module\susu\action\FetchActiveSusuAction;
use src\module\susu\action\FetchSusuAction;
use src\module\susu\action\JoinSusuAction;
use src\module\schedule\action\ListScheduleAction;
use src\module\schedule\action\SelectScheduleAction;
use src\module\susu\action\ListCycleAction;
use src\module\susu\action\SetSusuAction;
use src\module\susu\action\StartSusuAction;
use src\module\susu\action\UnlinkSusuAction;
use src\module\user\action\CreateGoogleUserAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\schema\Schema;
use src\module\user\action\FetchAddressAction;
use src\module\user\action\ListUsersByCommunityAction;
use src\module\user\action\ListUsersBySusuAction;
use src\module\user\action\SearchUsersAction;
use src\module\user\action\SetAddressAction;

class Router{
    protected Https $request;

    public function __construct($baseName){
        $this->request = new Https($baseName);
    }

    public function request(){
        return $this->request;
    }

    public function load(){
        $this->request->route('/schema', function ($req){
            $query = new Schema();
            $query->run();
            var_dump('Schema done running...');
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/test', function ($req){
            $query = new Repository();
            //$query->query('ALTER TABLE `group` RENAME TO `community`;');
            //$query->query('ALTER TABLE `groupLink` RENAME TO `communityLink`;');
            //$query->query('ALTER TABLE communityLink CHANGE COLUMN `groupId` `communityId` INT');
            //$query->query('ALTER TABLE susu CHANGE COLUMN `groupId` `communityId` INT');
            var_dump('None...');
        });

        $this->request->route('/signin', function ($req){
            return new LoginAction();
        });

        $this->request->route('/google/signin', function ($req){
            return new GoogleLoginAction();
        });

        $this->request->route('/logout', function ($req){
            return new LogoutAction();
        });

        $this->request->route('/fetch/session', function ($req){
            return new FetchSessionAction();
        });

        $this->request->route('/update/credential', function ($req){
            return new UpdateCredentialAction();
        });

        $this->request->route('/recover/account', function ($req){
            return new SendRecoveryEmailAction();
        });

        $this->request->route('/list/users', function ($req){
            return new ListUsersAction();
        });

        $this->request->route('/create/user', function ($req){
            return new CreateUserAction();
        });

        $this->request->route('/create/google/user', function ($req){
            return new CreateGoogleUserAction();
        });

        $this->request->route('/edit/user', function ($req){
            return new EditUserAction();
        });

        $this->request->route('/fetch/user', function ($req){
            return new FetchUserAction();
        });

        $this->request->route('/search/users', function ($req){
            return new SearchUsersAction();
        });

        $this->request->route('/list/community/users', function ($req){
            return new ListUsersByCommunityAction();
        });

        $this->request->route('/list/susu/users', function ($req){
            return new ListUsersBySusuAction();
        });

        $this->request->route('/set/address', function ($req){
            return new SetAddressAction();
        });

        $this->request->route('/fetch/address', function ($req){
            return new FetchAddressAction();
        });

        $this->request->route('/update/credential/with/refersh/token', function ($req){
            return new UpdateCredentialByTokenAction();
        });

        $this->request->route('/fetch/community', function ($req){
            return new FetchCommunityAction();
        });

        $this->request->route('/list/communities', function ($req){
            return new ListCommunitiesAction();
        });

        $this->request->route('/member/communities', function ($req){
            return new MemberCommunitiesAction();
        });

        $this->request->route('/owner/communities', function ($req){
            return new OwnerCommunitiesAction();
        });

        $this->request->route('/search/communities', function ($req){
            return new SearchCommunitiesAction();
        });

        $this->request->route('/set/community', function ($req){
            return new SetCommunityAction();
        });

        $this->request->route('/join/community', function ($req){
            return new JoinCommunityAction();
        });

        $this->request->route('/unlink/community', function ($req){
            return new UnlinkCommunityAction();
        });

        $this->request->route('/start/susu', function ($req){
            return new StartSusuAction();
        });

        $this->request->route('/set/susu', function ($req){
            return new SetSusuAction();
        });

        $this->request->route('/fetch/active/susu', function ($req){
            return new FetchActiveSusuAction();
        });

        $this->request->route('/fetch/susu', function ($req){
            return new FetchSusuAction();
        });

        $this->request->route('/conform/susu', function ($req){
            return new ConfirmSusuAction();
        });

        $this->request->route('/join/susu', function ($req){
            return new JoinSusuAction();
        });

        $this->request->route('/unlink/susu', function ($req){
            return new UnlinkSusuAction();
        });

        $this->request->route('/select/schedule', function ($req){
            return new SelectScheduleAction();
        });

        $this->request->route('/assign/schedule', function ($req){
            return new AssignScheduleAction();
        });

        $this->request->route('/list/schedule', function ($req){
            return new ListScheduleAction();
        });

        $this->request->route('/add/susu/contribution', function ($req){
            return new AddSusuContributionAction();
        });

        $this->request->route('/list/susu/contribution', function ($req){
            return new ListSusuContributionAction();
        });

        $this->request->route('/list/contribution', function ($req){
            return new ListContributionAction();
        });

        $this->request->route('/add/susu/payout', function ($req){
            return new AddSusuPayoutAction();
        });

        $this->request->route('/list/susu/payout', function ($req){
            return new ListSusuPayoutAction();
        });

        $this->request->route('/list/payout', function ($req){
            return new ListPayoutAction();
        });

        $this->request->route('/list/cycle', function ($req){
            return new ListCycleAction();
        });

        $this->request->route('/messanger/search', function ($req){
            return new SearchMessangerAction();
        });

        $this->request->route('/set/message', function ($req){
            return new SetMessageAction();
        });

        $this->request->route('/member/conversation', function ($req){
            return new ListConversationAction();
        });

        $this->request->route('/community/conversation', function ($req){
            return new ListCommunityMessagesAction();
        });

        $this->request->route('/list/messangers', function ($req){
            return new ListMessangersAction();
        });

        $this->request->route('/list/unseen/messages', function ($req){
            return new ListUnSeenMessagesAction();
        });

        $this->request->route('/set/invite', function ($req){
            return new SetInviteAction();
        });

        $this->request->route('/delete/invite', function ($req){
            return new DeleteInviteAction();
        });

        $this->request->route('/list/member/invite', function ($req){
            return new ListMemberInvitesAction();
        });

        $this->request->route('/list/target/invite', function ($req){
            return new ListTargetInvitesAction();
        });

        $this->request->route('/add/susu/refund', function ($req){
            return new AddSusuRefundAction();
        });

        $this->request->route('/list/refund', function ($req){
            return new ListRefundAction();
        });

        $this->request->route('/list/susu/refund', function ($req){
            return new ListSusuRefundAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
