<?php
namespace src\module\image\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\image\factory\ImageFactory;
use src\module\image\objects\Image;

class ImageRepository extends Repository{
    protected ImageFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ImageFactory();
    }
    
    public function create(Image $image):void{
        $this->insert('images')        
            ->add('id', $this->uuid($image->id()))
            ->add('name', $image->name())
            ->add('uniqueName', $image->uniqueName())
            ->add('productId', $this->uuid($image->productId()))
            ->add('default', $image->default())
            ->add('ext', $image->extention())
            ->add('isDocument', $image->isDocument());
        $this->execute();
    }
    
    public function edit(Image $image):void{
        $this->update('images')   
            ->set('name', $image->name())
            ->set('uniqueName', $image->uniqueName())
            ->set('productId', $this->uuid($image->productId()))
            ->set('default', $image->default())
            ->set('ext', $image->extention())
            ->set('isDocument', $image->isDocument())
            ->where('id', $this->uuid($image->id()));
        $this->execute();
    }
    
    public function deleteImages(Id $id):void{
        $this->delete('images') 
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function list(array $where):Collector{
        $this->select('images');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where('name', $where['name']);
        }
        if(isset($where['isDocument'])){
            $this->where('isDocument', (int)$where['isDocument']);
        }
        if(isset($where['productId'])){
            $this->where('productId', $this->uuid($where['productId']));
        }
        if(isset($where['default'])){
            $this->where('default', $where['default']);
        }
        if(isset($where['ext'])){
            $this->where('ext', $where['ext']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}