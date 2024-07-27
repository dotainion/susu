<?php
namespace src\module\susu\logic;

use src\module\susu\objects\Susu;
use src\module\susu\repository\SusuRepository;

class SetSusu{
    protected SusuRepository $repo;

    public function __construct(){
        $this->repo = new SusuRepository();
    }

    public function set(Susu $susu):void{
        $collector = $this->repo->listSusu([
            'id' => $susu->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($susu);
            return;
        }
        $this->repo->create($susu);
    }
}