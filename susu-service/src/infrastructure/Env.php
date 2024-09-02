<?php
namespace src\infrastructure;

use InvalidArgumentException;

class Env{
    protected array $messages = [];

    public static function dir():string{
        $filter = explode('/', self::uri());
        $trimed = array_filter($filter);
        $index = 0;
        foreach($trimed as $value) {  
            $trimed[$index] = $value;
            $index ++;
        } 
        return $trimed[0] ?? null;
    }

    public static function imageDomain():string{
        $dm = explode('.', self::serverName());
        if(!isset($dm[1]) || empty($dm[1]) || !isset($dm[2]) || empty($dm[2])){
            return '';
        }
        return 'https://'.$dm[1].'.'.$dm[2];
    }

    public static function uiDir():string{
        return 'green-energy';
    }

    public static function serverName():string{
        return $_SERVER['SERVER_NAME'];
    }

    public static function rootDir():string{
        return $_SERVER['DOCUMENT_ROOT'];
    }

    public static function domain():string{
        return $_SERVER['HTTP_HOST'];
    }

    public static function accessPath():?string{
        return $_SERVER['HTTP_ACCESSPATH']; //green-energy-admin/
    }

    public static function isAdminHost():bool{
        return self::accessPath() === '/green-energy-admin/';//todo: need to add admin domain
    }

    public static function ip():string{
        return $_SERVER['REMOTE_ADDR'];
    }

    public static function uri():string{
        return $_SERVER['REQUEST_URI'];
    }

    public static function headers($key=null){
        $headers = getallheaders();
        if($key === null){
            return $headers;
        }
        if(!isset($headers[$key])){
            throw new InvalidArgumentException('"'.$key.'" not in headers.');
        }
        return $headers[$key];
    }

    public static function authorizationHeader():?string{
        return self::headers('Authorization');
    }

    public static function server():string{
        return 'localhost';
    }

    public static function username():string{
        return 'ccagrena_susu';
    }

    public static function password():string{
        return 'ccagrena_susu#1';
    }

    public static function database():string{
        return 'ccagrena_susu';
    }
}
