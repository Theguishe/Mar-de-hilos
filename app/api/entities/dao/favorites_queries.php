<?php

require_once('../../helpers/database.php');

class Favorites_Queries extends Favorites{

    public function searchRow($value) {
        $sql = 'SELECT a.nombre_producto AS "Product Name", a.imagen AS "Image", b.correo AS "Customer"
                FROM productos a, clientes b, favoritos c
                WHERE a.id_producto = c.id_producto AND c.id_cliente = b.id_cliente AND a.nombre_producto ILIKE ? OR b.correo ILIKE ?';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO favoritos(id_producto, id_cliente)
                VALUES (?, ?)';

        $params = array($this->id_producto, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT a.nombre_producto AS "Product Name", a.imagen AS "Image", b.correo AS "Customer"
                FROM productos a, clientes b, favoritos c
                WHERE a.id_producto = c.id_producto AND c.id_cliente = b.id_cliente
                ORDER BY b.correo, a.nombre_producto';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM favoritos WHERE id_favorito = ?'; #ID to be implemented

        $params = array($this->id_favorito);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE favoritos SET id_producto = ?, id_cliente = ?
                WHERE id_favorito = ?';

        $params = array($this->id_producto, $this->id_cliente, $this->id_favorito);
        return Database::ExecuteRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM favoritos WHERE id_favorito = ?';
        $params = array($this->id_favorito);
        return Database::executeRow($sql, $params);
    }
}