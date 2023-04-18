<?php

require_once('../../helpers/database.php');

class Products_Queries extends Products
{

    # Method to search data
    public function searchRows($value)
    {
        $sql = 'SELECT a.nombre_producto AS "Product Name", a.image AS "Image", a.descripcion AS "Description", a.precio AS "Price", a.cantidad AS "Quantity", b.tipo_producto AS "PRODUCT TYPE", d.categoria AS "Category" 
                FROM productos a, tipos_productos b, categorias c
                WHERE a.id_tipoproducto = b.id_tipoproducto AND c.id_categoria = a.id_categoria AND a.nombre_producto ILIKE ? OR c.categoria ILIKE ?
                ORDER BY a.nombre_producto, c.categoria';

        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    # Method to create a row 
    public function createRow()
    {
        $sql = 'INSERT INTO productos(nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->nombre_producto, $this->imagen, $this->descripcion, $this->precio, $this->cantidad, $this->id_tipoproducto, $this->id_usuario, $this->id_categoria);
        return Database::executeRow($sql, $params);
    }

    # Method to read all data
    public function readAll()
    {
        $sql = 'SELECT a.nombre_producto AS "Product Name", a.image AS "Image", a.descripcion AS "Description", a.precio AS "Price", a.cantidad AS "Quantity", b.tipo_producto AS "PRODUCT TYPE", d.categoria AS "Category" 
                FROM productos a, tipos_productos b, categorias c
                WHERE a.id_tipoproducto = b.id_tipoproducto AND c.id_categoria = a.id_categoria
                ORDER BY a.nombre_producto, c.categoria';

        return Database::getRows($sql);
    }

    # Method to read just one row of data
    public function readOne()
    {
        $sql = 'SELECT * FROM productos WHERE id_producto = ?'; #ID to be implemented

        $params = array($this->id_producto);
        return Database::getRow($sql, $params);
    }

    # Method to update a row
    public function updateRow($current_image)
    {
        ($this->imagen) ? Validator::deleteFile($this->getPath(), $current_image) : $this->imagen = $current_image;

        $sql = 'UPDATE productos SET nombre_producto = ?, imagen = ?, descripcion = ?, precio = ?, cantidad = ?, id_tipoproducto = ?, id_usuario = ?, id_categoria = ?
                WHERE id_producto = ?';

        $params = array($this->nombre_producto, $this->imagen, $this->descripcion, $this->precio, $this->cantidad, $this->id_tipoproducto, $this->id_usuario, $this->id_categoria, $this->id_producto);
        return Database::ExecuteRow($sql, $params);
    }

    # Method to delete a row
    public function deleteRow()
    {
        $sql = 'DELETE FROM productos WHERE id_producto = ?';
        $params = array($this->id_producto);
        return Database::executeRow($sql, $params);
    }
}
