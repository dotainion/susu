<?php

namespace src\infrastructure;

use tools\infrastructure\Repository as ToolsRepository;

class Repository extends ToolsRepository{

    public function __construct(){
        parent::permissionOff();
        parent::__construct();
    }

    public function paginationIsEmpty(): bool{
        $limit = $this->request()->pagination()->limit();
        $offset = $this->request()->pagination()->offset();
        return ($limit === null || $limit == 0) && ($offset === null || $offset == 0);
    }
}
