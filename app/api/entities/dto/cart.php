<?php 

require_once('../../helpers/validator.php');
# require_once('../../entities/dao/cart_queries.php'); Wrong directory file


class Cart extends Cart_Queries{
    # Attributes declaration
    protected $id_carrito = null;
    protected $cantidad = null;
    protected $id_pedido_c = null;
    protected $id_resenia_detalle = null;
    protected $id_producto = null;


    # Asigning validations to our attributes 
    public function setID($value) {
        if(validator::validateNaturalNumber(($value))) {
            $this->id_carrito = $value;
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

    public function setID_Pedido_Cat($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_pedido_c = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Resenia($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_resenia_detalle = $value;
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

    // Getting attribute values

    public function getID() {
        return $this->id_carrito;
    }

    public function getCantidad() {
        return $this->cantidad;
    }

    public function getID_Pedido_Cat() {
        return $this->id_pedido_c;
    }

    public function getID_Resenia() {
        return $this->id_resenia_detalle;
    }

    public function getID_Producto() {
        return $this->id_producto;
    }
}