const { Router } = require('express');
const pool = require('../db');

const { 
    getAllTasks,
    getSingleTask, 
    creatingTask,
    updatingTask, 
    deletingTask,
    getOrderStatus,
    getProduct,
    getClient,
} = require('../controllers/catalog_orders.controller');

const router = Router();

router.get('/pedidosC', getAllTasks);

router.get('/pedidosCList/:id', getSingleTask);

router.get('/pedidosCS', getOrderStatus);

router.get('/pedidosCP', getProduct);

router.get('/pedidosCC', getClient);

router.post('/CpedidosC', creatingTask);

router.put('/pedidosCU/:id', updatingTask);

router.delete('/pedidosCD/:id', deletingTask);

module.exports = router;