<?php

require('../../helpers/validator.php');

class Reviews_Details {
    # Fields declaration
    protected $id_resenia_detalle = null;
    protected $imagen = null;
    protected $fecha = null;
    protected $hora = null;
    protected $resenia = null;
    protected $valoracion = null;
    protected $id_cliente = null;
    protected $id_producto = null;
    protected $path = '../../imgs/reviews';

    public function setID($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_resenia_detalle = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen($value)
    {
        if (Validator::validateImageFile($value, 500, 500)) {
            $this->imagen = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFecha($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setHora($value)
    {
        if (Validator::validateTime($value)) {
            $this->hora = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setResenia($value)
    {
        if (Validator::validateString($value, 2, 250)) {
            $this->resenia = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setValoracion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->valoracion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Cliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Producto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_producto = $value;
            return true;
        } else {
            return false;
        }
    }


    public function getID() {
        return $this->id_resenia_detalle;
    }

    public function getImagen() {
        return $this->imagen;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function getHora() {
        return $this->hora;
    }

    public function getResenia() {
        return $this->resenia;
    }

    public function getValoracion() {
        return $this->valoracion;
    }

    public function getID_cliente() {
        return $this->id_cliente;
    }

    public function getID_Producto() {
        return $this->id_producto;
    }

    public function getImage_Path() {
        return $this->path;
    }
}