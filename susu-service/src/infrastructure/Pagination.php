<?php
namespace src\infrastructure;

class Pagination{
    protected static int $limit = 50;
    protected static $request = null;

    public static function instance():Request{
        if(self::$request === null){
            self::$request = new Request();
        }
        return self::$request;
    }

    public static function offset():int{
        return self::instance()->get('offset') ?? 0;
    }

    public static function limit():int{
        return self::offset() + self::$limit;
    }

    public static function hasPagination():bool{
        return self::instance()->get('offset') !== null;
    }
}