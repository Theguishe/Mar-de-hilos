 <?php 

require_once('../../helpers/validator.php');
require_once('../../entities/dao/clients_queries.php');

 class Clients extends Clients_Queries {

    # Declaring attributes
    protected $id_cliente = null;
    protected $correo = null;
    protected $contrasenia = null;
    protected $dui = null;
    protected $direccion = null;
    protected $telefono = null;
    protected $fecha_nac = null;
    protected $id_estadocliente = null;

    #

    public function setID($value) {
        if(validator::validateNaturalNumber($value)){
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($value) {
        if(validator::validateEmail($value)){
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setContrasenia($value) {
        if(validator::validatePassword($value)){
            $this->contrasenia = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDUI($value) {
        if(validator::validateDUI($value)){
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDireccion($value) {
        if(validator::validateString($value, 5, 100)){
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($value) {
        if(validator::validatePhone($value)){
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFecha_Nac($value) {
        if(validator::validateDate($value)){
            $this->fecha_nac = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setID_Estado_Cliente($value) {
        if(validator::validateNaturalNumber($value)){
            $this->id_estadocliente = $value;
            return true;
        } else {
            return false;
        }
    }



    public function getID()
    {
        return $this->id_cliente;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getContrasenia()
    {
        return $this->contrasenia;
    }

    public function getDUI()
    {
        return $this->dui;
    }

    public function getDireccion()
    {
        return $this->direccion;
    }
    
    public function getFecha_Nac()
    {
        return $this->fecha_nac;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function getID_Estado_Cliente()
    {
        return $this->id_estadocliente;
    }
 }