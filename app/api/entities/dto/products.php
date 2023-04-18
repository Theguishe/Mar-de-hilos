<?php

require('../../helpers/validator.php');

class Products{
    # Fields declaration
    protected $id_producto = null;
    protected $nombre_producto = null;
    protected $imagen = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $cantidad = null;
    protected $id_tipoproducto = null;
    protected $id_usuario = null;
    protected $id_categoria = null;
    protected $image_path = '../../imgs/products/';

    # 

    public function setID($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value) {
        if(validator::validateString($value, 8, 8)) {
            $this->nombre_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen($value) {
        if(validator::validateImageFile($value, 500, 500)){
            $this->imagen = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($value) {
        if(validator::validateString($value, 12, 200)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setPrecio($value) {
        if(validator::validateMoney($value)) {
            $this->precio = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCantidad($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Tipo_Producto($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_tipoproducto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Usuario($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Categoria($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_categoria = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getID() {
        return $this->id_producto;
    }

    public function getNombre_Producto() {
        return $this->nombre_producto;
    }

    public function getImagen() {
        return $this->imagen;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function getPrecio() {
        return $this->precio;
    }

    public function getCantidad() {
        return $this->cantidad;
    }

    public function getID_Tipo_Producto() {
        return $this->id_tipoproducto;
    }

    public function getID_Usuario() {
        return $this->id_usuario;
    }

    public function getID_Categoria() {
        return $this->id_categoria;
    }

    public function getPath() {
        return $this->image_path;
    }
}