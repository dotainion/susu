<?php
namespace src\database;

use src\infrastructure\Request;

class Pagination{
    protected string $limit = '';
    protected string $offset = '';
    protected Request $request;

	public function __construct(){
		$this->request = new Request();
	}

	public function set(array $where):self{
        if(isset($where['limit'])){
            $this->limit($where['limit']);
        }
        if(isset($where['offset'])){
            $this->limit($where['offset']);
        }
        return $this;
	}

	public function limit(int $limit):self{
		$this->limit .= ' LIMIT ' . $limit;
        return $this;
	}

	public function offset(int $offset):self{
		$this->offset .= ' OFFSET ' . $offset;
        return $this;
	}

    public function reset():self{
		$this->limit = '';
		$this->offset = '';
        return $this;
    }

    public function hasPagination():bool{
        return !empty($this->get());
    }

    public function get():string{
        return $this->limit . $this->offset;
    }
}