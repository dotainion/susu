<?php
namespace src\database;

class Table {
    protected string $tableName;
    protected string $query;
	protected Where $where;
	protected Column $cols;
	protected OrderBy $orderBy;
	protected Pagination $pagination;

	public function __construct(){
		$this->where = new Where($this);
		$this->cols = new Column();
		$this->orderBy = new OrderBy($this);
		$this->pagination = new Pagination();
	}

    public function toString():string{
        return $this->build()->getQuery();
    }

    public function tableName():string{
        return $this->tableName;
    }

    public function select($tableName, $columns = '*'):self{
        $this->tableName = $tableName;
        $this->query = "SELECT $columns FROM `$this->tableName`";
        return $this;
    }

    public function insert($tableName):self{
        $this->tableName = $tableName;
        $this->query = "INSERT INTO `$this->tableName` ";
        return $this;
    }

    public function update($tableName):self{
        $this->tableName = $tableName;
        $this->query = "UPDATE `$this->tableName` SET ";
        return $this;
    }

    public function delete($tableName):self{
        $this->tableName = $tableName;
        $this->query = "DELETE FROM `$this->tableName`";
        return $this;
    }

    public function drop($tableName) {
        $this->query = "DROP TABLE IF EXISTS `$tableName`";
        return $this;
    }

    public function truncate($tableName):self{
        $this->query = "TRUNCATE TABLE `$tableName`";
        return $this;
    }

    public function alias($columnName, $newColumnName):self{
        $this->query = preg_replace(
            "/`$columnName`/",
            "`$columnName` AS `$newColumnName`",
            $this->query
        );
        return $this;
    }

    public function build():self{
        if(strpos(strtoupper($this->query), 'INSERT INTO') === 0){
            $columns = $this->cols()->columns();
            $values = $this->cols()->values();
            $this->query .= "($columns) VALUES ($values)";
        }elseif(strpos(strtoupper($this->query), 'UPDATE') === 0) {
            $this->query .= implode(", ", array_map(function($column, $value){
				return "`$column` = $value";
			}, array_keys($this->cols()->list()), array_values($this->cols()->list())));
        }
		$this->query .= $this->where()->get();
		$this->query .= $this->orderBy()->get();
		$this->query .= $this->pagination()->get();
		$this->query .= ';';
        return $this;
    }

    public function leftJoin($tableName, $column, $onTableName, $onColumn):self{
		$this->query .= " LEFT JOIN `$tableName` ON `$onTableName`.`$onColumn` = `$tableName`.`$column`";
        return $this;
    }

    public function innerJoin($tableName, $column, $onTableName, $onColumn):self{
		$this->query .= " INNER JOIN `$tableName` ON `$onTableName`.`$onColumn` = `$tableName`.`$column`";
        return $this;
    }

    public function renameTableTo($newName):self{
        $this->query = "ALTER TABLE `$this->tableName` RENAME TO `$newName`";
        return $this;
    }

    public function renameColumn($oldName, $newName):self{
        $this->query = "ALTER TABLE `$this->tableName` RENAME COLUMN `$oldName` TO `$newName`";
        return $this;
    }

    public function reset():self{
		$this->cols()->reset();
		$this->where()->reset();
		$this->pagination()->reset();
		$this->orderBy()->reset();
        return $this;
    }

    public function getQuery():string{
        return $this->query;
    }

    public function column($name, $value):self{
		$this->cols()->column($name, $value);
        return $this;
    }

    public function where():Where{
        return $this->where;
    }

    public function cols():Column{
        return $this->cols;
    }

    public function orderBy():OrderBy{
        return $this->orderBy;
    }

	public function pagination():Pagination{
		return $this->pagination;
	}
}