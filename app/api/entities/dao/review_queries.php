<?php

require_once('../../helpers/database.php');

class Review_Details_Queries extends Reviews_Details{

    public function searcRow($value) {
        $sql = 'SELECT b.correo AS "Customer", c.nombre_producto AS "Product Name",a.imagen AS "Image", a.fecha AS "REVIEW DATE", a.resenia AS "REVIEW", a.valoracion AS "Valoration"
                FROM resenias _detalles a, clientes c, productos c
                WHERE c.id_producto = a.id_producto AND a.id_cliente = b.id_cliente AND a.fecha ILIKE ? OR c.nombre_producto ILIKE ?';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO resenias_detalles(imagen_producto, fecha, hora, resenia, valoracion, id_cliente, id_producto)
                VALUES (?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->imagen, $this->fecha, $this->hora, $this->resenia, $this->valoracion, $this->id_cliente, $this->id_producto);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT b.correo AS "Customer", c.nombre_producto AS "Product Name",a.imagen AS "Image", a.fecha AS "REVIEW DATE", a.resenia AS "REVIEW", a.valoracion AS "Valoration"
                FROM resenias _detalles a, clientes c, productos c
                WHERE c.id_producto = a.id_producto AND a.id_cliente = b.id_cliente
                ORDER BY b.correo, a.fecha';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM resenias_detalles WHERE id_resenia_detalle = ?'; #ID to be implemented

        $params = array($this->id_resenia_detalle);
        return Database::getRow($sql, $params);
    }

    public function updateRow($current_image) {
        
        # We verify if exists a different img to delete the previuos one, or != to that save the current one instead
        
        ($this->imagen) ? Validator::deleteFile($this->getImage_Path(), $current_image) : $this->imagen = $current_image;

        $sql = 'UPDATE resenias_detalles SET imagen_producto = ?, fecha = ?, hora = ?, resenias = ?, valoracion = ?, id_cliente = ?, id_producto = ?
                WHERE id_resenia_detalle = ?';

        $params = array($this->imagen, $this->fecha, $this->hora, $this->resenia, $this->valoracion, $this->id_cliente, $this->id_producto, $this->id_resenia_detalle);
        return Database::ExecuteRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM resenias_detalles WHERE id_resenia_detalle = ?';
        $params = array($this->id_resenia_detalle);
        return Database::executeRow($sql, $params);
    }
}