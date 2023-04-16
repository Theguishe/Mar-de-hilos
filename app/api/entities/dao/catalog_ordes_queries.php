<?php

require_once('../../helpers/database.php');

class Catalog_Orders_Queries extends Catalog_Orders{

    public function searchRows($value) {
        $sql = 'SELECT a.fecha AS "Order Date", a.hora AS "Order Times", b.estado_pedido AS "Order Status", c.correo AS "Customer"
                FROM pedidos_catalogo a, estados_pedidos b, clientes c
                WHERE b.id_estadopedido = a.id_estadopedido AND a.id_cliente = c.id_cliente AND a.fecha ILIKE ? OR c.correo ILIKE ?';

        $params = array("%$value%","%$value%");
        return Database::getRows($sql, $params);
    }

    
    public function createRow() {
        $sql = 'INSERT INTO pedidos_catalogo(fecha, hora, id_estadopedido, id_cliente)
                VALUES (?, ?, ?, ?)';
        
        $params = array($this->fecha, $this->hora, $this->id_estadopedido, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }
    
    public function readAll() {
        $sql = 'SELECT a.fecha AS "Order Date", a.hora AS "Order Times", b.estado_pedido AS "Order Status", c.correo AS "Customer"
                FROM pedidos_catalogo a, estados_pedidos b, clientes c
                WHERE b.id_estadopedido = a.id_estadopedido AND a.id_cliente = c.id_cliente
                ORDER BY a.fecha, a.hora, c.correo';

        return Database::getRow($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM pedidos_catalogo WHERE id_pedido_c = ?';

        $params = array($this->id_pedido_c);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE pedidos_catalogo SET fecha = ?, hora = ?, id_estadopedido = ?, id_cliente = ?
                WHERE id_pedido_c = ?';

        $params = array($this->fecha, $this->hora, $this->id_estadopedido, $this->id_cliente, $this->id_pedido_c);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM pedidos_catalogo WHERE id_pedido_c = ?';
        $params = array($this->id_pedido_c);
        return Database::executeRow($sql, $params);
    }
}