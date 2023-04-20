<?php

require_once('../../entities/dto/clients.php');

if (isset($_GET['action'])) {

    session_start();

    $client = new Clients;

    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);

    if ($_SESSION['id_usuario']) {
        # We compare the action to be realizaed when an admin has loged in

        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $client->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There is ' . count($result['dataset']) . ' registers';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'There is no data registered';
                }
                break;
            case 'search':
                $_POST = validator::validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Enter a value to search';
                } elseif ($result['dataset'] = $client->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'There is ' . count($result['dataset']) . ' coincidences';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'There is no coincidences';
                }
                break;
            case 'create':
                $_POST = validator::validateForm($_POST);
                if (!$client->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Incorrect email';
                } else if (!$client->setContrasenia($_POST['contrasenia'])) {
                    $result['exception'] = 'Incorrect password';
                } elseif (!$client->setDUI($_POST['dui'])) {
                    $result['exception'] = 'Incorrect dui';
                } elseif (!$client->setDireccion($_POST['direccion'])) {
                    $result['exception'] = 'Incorrect address';
                } else if (!$client->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Incorrect phone number';
                } else if (!$client->setFecha_Nac($_POST['fecha_nacimiento'])) {
                    $result['exception'] = 'Incorrect date format';
                } else if (!$client->setID_Estado_Cliente($_POST['id_estadocliente'])) {
                    $result['exception'] = 'Incorrect client status';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if ($client->setID($_POST['id_cliente'])) {
                    $result['exception'] = 'Incorrect client';
                } else if ($result['dataset'] = $client->readOne()) {
                    $result['status'] = 1;
                } else if (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Non-existent client';
                }
                break;
            case 'update':
                $_POST = validator::validateForm($_POST);
                if (!$client->setID($_POST['id_cliente'])) {
                    $result['exception'] = 'Incorrect client';
                } elseif (!$data = $client->readOne()) {
                    $result['exception'] = 'Non-existent client';
                } elseif (!$client->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Incorrect email';
                } else if (!$client->setContrasenia($_POST['contrasenia'])) {
                    $result['exception'] = 'Incorrect password';
                } elseif (!$client->setDUI($_POST['dui'])) {
                    $result['exception'] = 'Incorrect dui';
                } elseif (!$client->setDireccion($_POST['direccion'])) {
                    $result['exception'] = 'Incorrect address';
                } else if (!$client->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Incorrect phone number';
                } else if (!$client->setFecha_Nac($_POST['fecha_nacimiento'])) {
                    $result['exception'] = 'Incorrect date format';
                } else if (!$client->setID_Estado_Cliente($_POST['id_estadocliente'])) {
                    $result['exception'] = 'Incorrect client status';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                if (!$client->setID($_POST['id_cliente'])) {
                    $result['exception'] = 'Incorrect client';
                } elseif (!$data = $client->readOne()) {
                    $result['exception'] = 'Non-existent client';
                } else if ($client->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Client removed succesfully';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
        }

        header('content-type: application/json; charset=utf-8');
        # We print the result in format JSON and returns to controller
        print(json_encode($result));
    } else {
        print(json_encode('Access denied'));
    }
} else {
    print(json_encode('Resource not available'));
}
