<?php 

require_once('../../helpers/database.php');

class Customized_Orders_Queries extends Customized_Orders{

    public function searchRow($value) {
        $sql = 'SELECT a.fecha AS "ORDER DATE", a.hora AS "ORDER TIME", b.correo AS "Customer", a.solicitud AS "Query"
                FROM pedidos_personalizados a, clientes b
                WHERE a.id_cliente = b.id_cliente AND b.correo ILIKE ? OR a.fecha ILIKE ?';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO pedidos_personalizados(fecha, hora, id_cliente, solicitud)
                VALUES (?, ?, ?, ?)';

        $params = array($this->fecha, $this->hora, $this->id_cliente, $this->solicitud);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT a.fecha AS "ORDER DATE", a.hora AS "ORDER TIME", b.correo AS "Customer", a.solicitud AS "Query"
                FROM pedidos_personalizados a, clientes b
                WHERE a.id_cliente = b.id_cliente
                ORDER BY a.fecha, a.hora, b.correo';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM pedidos_personalizados WHERE id_pedido_p = ?'; #ID to be implemented

        $params = array($this->id_pedido_p);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE pedidos_personalizados SET fecha = ?, hora = ?, id_cliente = ?, solicitud = ?
                WHERE id_pedido_p = ?';

        $params = array($this->fecha, $this->hora, $this->id_cliente, $this->solicitud, $this->id_pedido_p);
        return Database::ExecuteRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM pedidos_personalizados WHERE id_pedido_p = ?';
        $params = array($this->id_pedido_p);
        return Database::executeRow($sql, $params);
    }
}