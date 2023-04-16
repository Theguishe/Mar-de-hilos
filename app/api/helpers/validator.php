<?php

class validator {

    private static $passwordError = null;
    private static $fileError = null;
    private static $fileName = null;

    public static function getPasswordError() {
        return self::$passwordError;
    }

    public static function getFileName() {
        return self::$fileName;
    }

    public static function getFileError() {
        return self::$fileError;
    }

    public static function validateForm($fields){
        foreach ($fields as $index => $value) {
            $value = trim($value);
            $fields[$index] = $value;
        }
        return $fields;
    }

    public static function validateNaturalNumber($value) {
        if (filter_var($value, FILTER_VALIDATE_INT, array('min_range' => 1))){
            return true;
        } else {
            return false;
        }
    }

    public static function validateImageFile($file, $max_width, $max_height) {
        list($width, $height, $type) = getImageSize($file['tmp_name']);
        if($file['size'] > 2097152) {
            self::$fileError = 'La imagen debe ser menor a 2MB';
            return false;
        } elseif ($width > $max_width || $height > $max_height) {
            self::$fileError = 'La dimension de la imagen es incorrecta';
            return false;
        } elseif ($type == 2 || $type == 3) {
            
            $extension = strtolower(pathinfo($file['name'],PATHINFO_EXTENSION));

            self::$fileName = uniqid() . '.' . $extension;
            return true;
        } else {
            self::$fileError = 'El tipo de imagen debe ser jpg on png'; 
            return false;
        }
    }

    public static function validateEmail($value) {
        if(filter_var($value, FILTER_VALIDATE_EMAIL)){
            return true;
        } else {
            return false;
        }
    }

    public static function validateBoolean($value) {
        if($value == 1 || $value == 0 || $value == true || $value == false) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateString($value, $minimum, $maximum) {
        if(preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s\,\;\.]{' . $minimum . '.' . $maximum . '}$/' , $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateAlphabetic($value, $minimum, $maximum) {
        if (preg_match('/^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]{' . $minimum . ',' . $maximum . '}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateAlphanumeric($value, $minimum, $maximum) {
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s]{' . $minimum . ',' . $maximum . '}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateMoney($value) {
        if(preg_match('/^[0-9]+(?:\.[0-9]{1,2})?$/', $value)){
            return true;
        } else {
            return false;
        }
    }

    public static function validateTime($value) {
        $time = explode(':', $value);
        if(checkdate($time[0], $time[1], $time[null])) {
            return true;
        } else {
            return false;
        }
    }

    public static function validatePassword($value) {
        if (strlen($value) < 12) {
            self::$passwordError = 'Clave menor a 12 caracteres';
            return false;
        } elseif (strlen($value) <= 72) {
            return true;
        } else {
            self::$passwordError = 'Clave mayor a 72 caracteres';
            return false;
        }
    }

    public static function validateDUI($value) {
        if(preg_match('/^[0-9]{8}[-][0-9]{1}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validatePhone($value) {
        if(preg_match('/^[2,6,7]{1}[0-9]{3}[-][0-9]{4}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateDate($value) {
        $date = explode('-', $value);
        if (checkdate($date[1], $date[2], $date[0])) {
            return true;
        } else {
            return false;
        }
    }

    public static function saveFile($file, $path, $name) {
        if(move_uploaded_file($file['tmp_name'], $path . $name)) {
            return true;
        } else {
            return false;
        }
    }

    public static function deleteFile($path, $name) {
        if(@unlink($path . $name)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validatePDFFILE($file) {
        if($file['size'] > 2097152) {
            self::$fileError = 'El archivo debe ser menor a 2MB';
            return false;
        } elseif (mime_content_type($file['tmp_name']) == 'application/pdf') {
            
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            self::$fileName = uniqid() . ',' . $extension;
            return true;
        } else {
            self::$fileError = 'The file has to be a PDF';
            return false;
        }
    }
}