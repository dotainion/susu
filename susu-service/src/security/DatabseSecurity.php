<?php
namespace src\security;

use src\infrastructure\Env;

class DatabseSecurity{
	public function username():string{
		return Env::username();
	}

	public function password():string{
		return Env::password();
	}

	public function server():string{
		return Env::server();
	}

	public function database():string{
		return Env::database();
	}
}

?>