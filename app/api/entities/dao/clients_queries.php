<?php 

require_once('../../helpers/database.php');

class Clients_Queries extends Clients {

    public function searchRow($value) {
        $sql = 'SELECT a.correo AS "Email", a.contrasenia AS "Password", a.dui AS "DUI", a.direccion AS "Address", a.telefono AS "Phone Number", a.fecha_nacimiento AS "BirthDate", b.estado_cliente AS "Customer Status"
                FROM clientes a, estados_clientes b
                WHERE a.id_cliente = b.id_cliente AND a.correo ILIKE ? OR a.dui ILIKE ?';

        $params = array("%$value%", "%$value%");
    }

    public function createRow() {
        $sql = 'INSERT INTO clientes(correo, contrasenia, dui, direccion, telefono, fecha_nacimiento, id_estadocliente)
                VALUES (?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->correo, $this->contrasenia, $this->dui, $this->direccion, $this->telefono, $this->fecha_nac, $this->id_estadocliente);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT a.correo AS "Email", a.contrasenia AS "Password", a.dui AS "DUI", a.direccion AS "Address", a.telefono AS "Phone Number", a.fecha_nacimiento AS "BirthDate", b.estado_cliente AS "Customer Status"
                FROM clientes a, estados_clientes b
                ORDER BY a.correo, b.estado_cliente';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE clientes SET correo = ?, contrasenia = ?, dui = ?, direccion = ?, telefono = ?, fecha_nacimiento = ?, id_estadocliente = ?
                WHERE id_cliente = ?';

        $params = array($this->correo, $this->contrasenia, $this->dui, $this->direccion, $this->telefono, $this->fecha_nac, $this->id_estadocliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::executeRow($sql, $params);
    }
}