<?php

require('../../helpers/validator.php');

class Customized_Orders {
    # Fields declaration
    protected $fecha = null;
    protected $hora = null;
    protected $id_pedido_p = null;
    protected $id_cliente = null;
    protected $solicitud = null;
    protected $mardehilos_email = null;

    # 

    public function setID($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_pedido_p = $value;
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

    public function setSolicitud($value) {
        if(validator::validateString($value, 12, 250)) {
            $this->solicitud = $value;
            return true;
        } else {
            return false;
        }
    }


    public function getID()
    {
        return $this->id_pedido_p;
    }

    public function getID_Cliente()
    {
        return $this->id_cliente;
    }

    public function getSolicitud()
    {
        return $this->solicitud;
    }

    public function getEmail()
    {
        return $this->mardehilos_email;
    }
}