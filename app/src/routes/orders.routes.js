
// We import the need extensions and db file
const { Router } = require('express');
const pool = require('../db');

// We import the different functions from cart-controller
const { 
    getAllTasks,
    getSingleTask, 
    creatingTask,
    getOrderStatus,
    getProduct,
    getClient,
} = require('../controllers/orders.controller');

// We  create a variable that will help us to make the http request using the routes
const router = Router();

// We define the different urls destines for every task to attatch
router.get('/orders', getAllTasks); // To get all the registers

router.get('/cartList/:id', getSingleTask); // To get a register based on the ID

// To charge comboboxes
router.get('/cartS', getOrderStatus);

router.get('/pedidosCP', getProduct);

router.get('/pedidosCC', getClient);

router.post('/CpedidosC', creatingTask); // To create a register

// router.put('/pedidosCU/:id', updatingTask); // To update a register

// router.delete('/pedidosCD/:id', deletingTask); // To delete a register


// We export our  request variable
module.exports = router;