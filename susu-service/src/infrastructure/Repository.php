<?php
namespace src\infrastructure;

use permission\database\Permission;
use permission\SqlRepository;

class Repository extends SqlRepository{
	protected static ?string $userId = null;

	public function __construct(){
		parent::__construct();
		Permission::setRequirePermission(false);
	}
}

?>