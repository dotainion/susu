<?php
namespace src\router;

use src\infrastructure\Https;
use src\module\groups\action\FetchGroupAction;
use src\module\groups\action\JoinGroupAction;
use src\module\groups\action\ListGroupsAction;
use src\module\groups\action\MemberGroupsAction;
use src\module\groups\action\SetGroupAction;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\GoogleLoginAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\user\action\CreateGoogleUserAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\schema\Schema;
use src\module\user\action\FetchAddressAction;
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
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/test', function ($req){
            /*$repo = new Repository();
            $repo->query("ALTER TABLE `products` ADD COLUMN `createdById` binary(16) NOT NULL");*/
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

        $this->request->route('/set/group', function ($req){
            return new SetGroupAction();
        });

        $this->request->route('/join/group', function ($req){
            return new JoinGroupAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
