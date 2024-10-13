<?php
namespace src\database;

use src\infrastructure\Id;
use src\security\Connection;

class Repository extends Table{
	protected Connection $db;

	public function __construct(){
		parent::__construct();
		$this->db = Connection::instance();
	}

	public function query($statement):self{
		$this->db->query($statement);
		$this->db->commit();
		return $this;
	}

	public function execute():self
	{
		$this->query($this->toString());
		$this->reset();
		return $this;
	}

	public function closeConnection(){
		$this->db->close();
	}

	public function statement(){
		$this->db->statement();
	}

	public function results(){
		return $this->db->results() ?? [];
	}

	public function uuid($uuid){
		if($uuid === null){
			return null;
		}
		if(is_array($uuid)){
			$ids =[];
			foreach($uuid as $id){
				$ids[] = (new Id())->toBytes((string)$id);
			}
			return $ids;
		}
		return (new Id())->toBytes((string)$uuid);
	}
}

?>