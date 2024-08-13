<?php
namespace src\router;

use InvalidArgumentException;
use src\infrastructure\Https;
use src\module\groups\action\FetchGroupAction;
use src\module\groups\action\JoinGroupAction;
use src\module\groups\action\ListGroupsAction;
use src\module\groups\action\MemberGroupsAction;
use src\module\groups\action\OwnerGroupsAction;
use src\module\groups\action\SetGroupAction;
use src\module\contribution\action\AddSusuContributionAction;
use src\module\contribution\action\ListSusuContributionAction;
use src\module\contribution\action\UpdateSusuContributionAction;
use src\module\groups\action\UnlinkGroupAction;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\GoogleLoginAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\messages\action\ListConversationAction;
use src\module\messages\action\ListGroupMessagesAction;
use src\module\messages\action\ListMessangersAction;
use src\module\messages\action\SearchMessangerAction;
use src\module\messages\action\SetMessageAction;
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
use src\module\user\action\ListUsersByGroupAction;
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
            $scriptPath = __DIR__.'/../../websocket-server.php';
            $command = "php $scriptPath > /tmp/websocket-server.log 2>&1 &";

            if (!file_exists($scriptPath)) {
                throw new InvalidArgumentException('Path not exist.');
            }

            $output = [];
            $return_var = 0;
            exec($command, $output, $return_var);

            var_dump($output);
            var_dump("Return status: " . $return_var);
            foreach ($output as $line) {
                echo htmlspecialchars($line) . "<br>";
            }

            echo "WebSocket server started.";
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

        $this->request->route('/list/group/users', function ($req){
            return new ListUsersByGroupAction();
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

        $this->request->route('/fetch/group', function ($req){
            return new FetchGroupAction();
        });

        $this->request->route('/list/groups', function ($req){
            return new ListGroupsAction();
        });

        $this->request->route('/member/groups', function ($req){
            return new MemberGroupsAction();
        });

        $this->request->route('/owner/groups', function ($req){
            return new OwnerGroupsAction();
        });

        $this->request->route('/set/group', function ($req){
            return new SetGroupAction();
        });

        $this->request->route('/join/group', function ($req){
            return new JoinGroupAction();
        });

        $this->request->route('/unlink/group', function ($req){
            return new UnlinkGroupAction();
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

        $this->request->route('/list/schedule', function ($req){
            return new ListScheduleAction();
        });

        $this->request->route('/add/susu/contribution', function ($req){
            return new AddSusuContributionAction();
        });

        $this->request->route('/update/susu/contribution', function ($req){
            return new UpdateSusuContributionAction();
        });


        $this->request->route('/list/susu/contribution', function ($req){
            return new ListSusuContributionAction();
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

        $this->request->route('/group/conversation', function ($req){
            return new ListGroupMessagesAction();
        });

        $this->request->route('/list/messangers', function ($req){
            return new ListMessangersAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
