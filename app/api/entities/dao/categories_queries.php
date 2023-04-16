<?php 

require_once('../../helpers/database.php');

class Categories_Queries extends Categories {

    public function searchRow($value) {
        $sql = 'SELECT id_categoria AS "Category ID", categoria AS "Category" FROM categorias WHERE categoria ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow() {
        $sql = 'INSERT INTO categorias(categoria) VALUES (?)';
        $params = array($this->categoria);
        return Database::executeRow($sql, $params);
    }

    public function readAll() {
        $sql = 'SELECT id_categoria AS "Category ID", categoria AS "Category" FROM categorias
                ORDER BY categoria';

        return Database::getRows($sql);
    }

    public function readOne() {
        $sql = 'SELECT id_categoria AS "Category ID", categoria AS "Category" FROM categorias
                WHERE id_categoria = ?';
        
        $params = array($this->id_categoria);
        return Database::getRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE categorias SET categoria = ? 
                WHERE id_categoria = ?';

        $params = array($this->id_categoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow() {
        $sql = 'DELETE FROM categorias WHERE id_categoria = ?';
        $params = array($this->id_categoria);
        return Database::executeRow($sql, $params);
    }
}