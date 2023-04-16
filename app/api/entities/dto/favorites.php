<?php

require('../../helpers/validator.php');

class Favorites {
    # Fields declaration
    protected $id_favorito = null;
    protected $id_producto = null;
    protected $id_cliente = null;

    #

    public function setID($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_favorito = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Producto($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Cliente($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getID() {
        return $this->id_favorito;
    }

    public function getID_Producto() {
        return $this->id_producto;
    }

    public function getID_Cliente() {
        return $this->id_cliente;
    }
}