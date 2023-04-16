<?php 

require_once('../../helpers/database.php');

class Cart_Queries extends Cart{

    # Function to search in the inputText
    public function searchRows($value) {
        $sql = 'SELECT d.correo AS "Cliente", b.nombre_producto AS "Product Name", b.imagen AS "Image", a.cantidad, a.id_pedido_c AS "ORDER ID", a.id_resenia_detalle AS "REVIEW ID" 
                FROM carrito a, productos b, pedidos_catalogo c, clientes d
                WHERE b.id_producto = a.id_producto AND a.id_pedido_c = c.id_pedido_c AND c.id_cliente = c.id_cliente AND a.nombre_producto ILIKE ? OR d.correo ILIKE ?
                ORDER BY b.nombre_producto, d.correo';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO carrito(cantidad, id_pedido_c, id_resenia_detalle, id_producto)
                VALUES (?, ?, ?, ?)';

        $params = array($this->cantidad, $this->id_pedido_c, $this->id_resenia_detalle, $this->id_producto);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT b.nombre_producto AS "Product Name", a.cantidad AS "Quantity", a.id_pedido_c AS "ORDER ID", a.id_resenia_detalle AS "REVIEW ID"
            FROM carrito a, productos b
            WHERE a.id_producto = b.id_producto
            ORDER BY b.nombre_producto';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT * FROM carrito WHERE id_carrito = ?'; #ID to be implemented

        $params = array($this->id_carrito);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE carrito SET cantidad = ?, id_pedido_c = ?, id_resenia_detalle = ?, id_producto = ?
                WHERE id_carrito = ?';

        $params = array($this->cantidad, $this->id_pedido_c, $this->id_resenia_detalle, $this->id_producto, $this->id_carrito);
        return Database::ExecuteRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM carrito WHERE id_carrito = ?';
        $params = array($this->id_carrito);
        return Database::executeRow($sql, $params);
    }
}