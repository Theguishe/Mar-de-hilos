const { Router } = require('express');
const pool = require('../db');

const { 
    getAllTasks,
    getSingleTask, 
    creatingTask, 
    updatingTask, 
    deletingTask, 
    getProductTypeTable,
    getCategoriesTable,
    getUsersTable
} = require('../controllers/products.controller');

const router = Router();

router.get('/products', getAllTasks);

router.get('/productsList/:id', getSingleTask);

router.get('/tipoP', getProductTypeTable);

router.get('/usuarios', getUsersTable);

router.get('/categorias', getCategoriesTable);

router.post('/cproducts', creatingTask);

router.put('/productU/:id', updatingTask);

router.delete('/productD/:id', deletingTask);

module.exports = router;