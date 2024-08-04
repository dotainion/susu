<?php
namespace src\database;

use src\security\Connection;

class Table{
	protected Connection $db;
	protected $statement;
	protected $column = '';
	protected $isCreating = false;

	public function __construct(){
		$this->db = Connection::instance();
	}

	public function create($tableName){
		$this->isCreating = true;
		$this->statement = 'CREATE TABLE IF NOT EXISTS `'.$tableName.'` ';
		return $this;
	}

	public function drop($tableName){
		$this->statement = 'DROP TABLE `'.$tableName.'`;';
	}

	public function truncate($tableName){
		$this->statement = 'TRUNCATE TABLE `'.$tableName.'`;';
	}

	public function alter($tableName):self{
		$this->statement = 'ALTER TABLE `'.$tableName.'` ';
		return $this;
	}

	public function rename($name){
		if($this->column){
			$this->column .= ',';
		}
		$this->column .= 'RENAME TO `'.$name.'`;';
		return $this;
	}

	public function addColumn($columnName){
		if($this->column){
			$this->column .= ',';
		}
		$this->column .= 'ADD COLUMN `'.$columnName.'` ';
		return $this;
	}

	public function changeColumn($columnFromName, $columnToName){
		if($this->column){
			$this->column .= ',';
		}
		$this->column .= 'CHANGE COLUMN `'.$columnFromName.'` `'.$columnToName.'` ';
		return $this;
	}



	public function column($columnName){
		if($this->column){
			$this->column .= ',';
		}
		$this->column .= '`'.$columnName.'` ';
		return $this;
	}

	public function customQuery($statement){
		$this->forceSemicolon($statement);
		$this->db->query($statement);
	}

	public function closeConnection(){
		$this->db->close();
	}

	public function forceSemicolon(&$statement){
		$statement = trim($statement, ' ');
		$semicolon = substr($statement, strlen($statement) -1);
		if($semicolon === ';'){
			return $statement;
		}
		$statement.=' ;';
	}

	public function mergeColumnWithStatement(){
		if($this->isCreating){
			return;
		}
		$this->statement .= $this->column;
	}

	public function execute(){
		$this->isCreating && $this->endTransaction();
		$this->mergeColumnWithStatement();
		$this->customQuery($this->statement);
		return $this;
	}

	public function endTransaction(){
		$this->statement .= "(".$this->column .") ENGINE=InnoDB CHARACTER SET utf8mb4;";
		return $this;
	}

	public function reset(){
		$this->column = "";
		$this->statement = "";
		return $this;
	}

	public function statement():string{
		return str_replace(PHP_EOL, '', $this->statement);
	}

	private function addNullable(bool $nullable = false):string{
		if($nullable){
			return '';
		}
		return 'NOT NULL';
	}

	public function bindary(bool $nullable = false){
		$this->column.="binary(16) " . $this->addNullable($nullable);
		return $this;
	}

	public function timestamp(bool $nullable = false){
		$this->column.="timestamp ".$this->addNullable($nullable)." DEFAULT CURRENT_TIMESTAMP";
		return $this;
	}

	public function int(){
		$this->column.="int DEFAULT '0'";
		return $this;
	}

	public function tinyint(){
		$this->column.="tinyint";
		return $this;
	}

	public function bool(){
		$this->column.="tinyint(1) NOT NULL  DEFAULT '0'";
		return $this;
	}

	public function string(){
		$this->column.="varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
		return $this;
	}

	public function paragraph(){
		$this->column.="varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
		return $this;
	}

	public function book(){
		$this->column.="varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
		return $this;
	}
}

?>