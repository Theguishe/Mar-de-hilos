<?php

require('../../helpers/validator.php');

class Categories {
    # Fields declaration
    protected $id_categoria = null;
    protected $categoria = null;

    #
    public function setID($value) {
        if(validator::validateNaturalNumber($value)) {
            $this->id_categoria = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCategoria($value) {
        if(validator::validateString($value, 1, 50)) {
            $this->categoria = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getID() {
        return $this->id_categoria;
    }

    public function getCategoria() {
        return $this->categoria;
    }
}