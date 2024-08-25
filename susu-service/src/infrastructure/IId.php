<?php
namespace src\infrastructure;

interface IId{
    public function toString():string;
    public function set(?string $uuid):self;
}