<?php

require('../../helpers/validator.php');

class Catalog_Orders {
    # Fields declaration
    protected $id_pedido_c = null;
    protected $fecha = null;
    protected $hora = null;
    protected $id_estadopedido = null;
    protected $id_cliente = null;

    # 

    public function setID($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_pedido_c = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFecha($value) {
        if(validator::validateDate($value)) {
            $this->fecha = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setHora($value) {
        if(validator::validateTime($value)) {
            $this->hora = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Estado_Pedido($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_estadopedido = $value;
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
}