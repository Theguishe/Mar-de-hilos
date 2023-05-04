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
} = require('../controllers/cart.controller');

const router = Router();

router.get('/cart', getAllTasks);

router.get('/cartList/:id', getSingleTask);

router.get('/cartS', getOrderStatus);

router.get('/pedidosCP', getProduct);

router.get('/pedidosCC', getClient);

router.post('/CpedidosC', creatingTask);

router.put('/pedidosCU/:id', updatingTask);

router.delete('/pedidosCD/:id', deletingTask);

module.exports = router;