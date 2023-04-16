<?php

require('../../helpers/validator.php');

class Users {
    # Fields declaration
    protected $id_usuario = null;
    protected $nombre_usuario = null;
    protected $contrasenia = null;
    protected $dui = null;
    protected $fecha_nac = null;
    protected $telefono = null;
    protected $correo = null;
    protected $direccion = null;
    protected $id_nivelusuario = null;
    protected $id_estadousuario = null;

    public function setID($value){
        if(Validator::validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre_Usuario($value){
        if(Validator::validateString($value,1 , 30)) {
            $this->nombre_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setContrasenia($value){
        if(Validator::validatePassword($value)) {
            $this->contrasenia = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDUI($value){
        if(Validator::validateDUI($value)) {
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFecha_Nac($value){
        if(Validator::validateDate($value)) {
            $this->fecha_nac = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($value){
        if(Validator::validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($value){
        if(Validator::validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDireccion($value){
        if(Validator::validateString($value, 12, 120)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Nivel_Usuario($value){
        if(Validator::validateNaturalNumber($value)) {
            $this->id_nivelusuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Estado_Usuario($value){
        if(Validator::validateNaturalNumber($value)) {
            $this->id_estadousuario = $value;
            return true;
        } else {
            return false;
        }
    }


    public function getID()
    {
        return $this->id_usuario;
    }

    public function getNombre_Usuario()
    {
        return $this->nombre_usuario;
    }

    public function getContrasenia()
    {
        return $this->contrasenia;
    }

    public function getDUI()
    {
        return $this->dui;
    }

    public function getFecha_Nac()
    {
        return $this->fecha_nac;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }
    
    public function getCorreo()
    {
        return $this->correo;
    }

    public function getDireccion()
    {
        return $this->direccion;
    }

    public function getID_Nivel_Usuario()
    {
        return $this->id_nivelusuario;
    }

    public function getID_Estado_Usuario()
    {
        return $this->id_estadousuario;
    }
}