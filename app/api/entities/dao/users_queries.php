<?php

require_once('../../helpers/database.php');

class Users_Queries extends Users {

    public function searchRow($value) {
        $sql = 'SELECT a.nombre_usuario AS "User Name", a.contrasenia AS "Password", a.dui AS "DUI", a.fecha_nacimiento AS "BirthDate", a.telefono AS "Phone Number", a.correo AS "User Email", a.direccon AS "Address", b.nivel_usuario AS "User Level", b.estado_usuario AS "User Status"
                FROM usuarios a, niveles_usuario b, estados_usuarios c
                WHERE b.id_nivelusuario = a.id_nivelusuario AND a.id_estadousuario = c.id_estadousuario AND a.nombre_usuario ILIKE ? OR a.dui ILIKE ?';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO usuarios(nombre_usuario, contrasenia, dui, fecha_nacimiento, telefono, correo, direccion, id_nivelusuario, id_estadousuario)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        $params = array($this->nombre_usuario, $this->contrasenia, $this->dui, $this->fecha_nac, $this->telefono, $this->correo, $this->direccion, $this->id_nivelusuario, $this->id_estadousuario);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT a.nombre_usuario AS "User Name", a.contrasenia AS "Password", a.dui AS "DUI", a.fecha_nacimiento AS "BirthDate", a.telefono AS "Phone Number", a.correo AS "User Email", a.direccon AS "Address", b.nivel_usuario AS "User Level", b.estado_usuario AS "User Status"
                FROM usuarios a, niveles_usuario b, estados_usuarios c
                WHERE b.id_nivelusuario = a.id_nivelusuario AND a.id_estadousuario = c.id_estadousuario
                ORDER BY a.nombre_usuario, a.dui';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM usuarios WHERE id_usuario = ?'; #ID to be implemented

        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE usuarios SET nombre_usuario = ?, contrasenia = ?, dui = ?, fecha_nacimiento = ?, telefono = ?, correo = ?, direccion = ?, id_nivelusuario = ?, id_estadousuario = ?
                WHERE id_usuario = ?';

        $params = array($this->nombre_usuario, $this->contrasenia, $this->dui, $this->fecha_nac, $this->telefono, $this->correo, $this->direccion, $this->id_nivelusuario, $this->id_estadousuario, $this->id_usuario);
        return Database::ExecuteRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::executeRow($sql, $params);
    }
}