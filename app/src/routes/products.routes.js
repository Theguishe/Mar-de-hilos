// We import the need extensions and db file
const { Router } = require('express');
const pool = require('../db');

// We import the different functions from products-controller
const { 
    getAllTasks,
    getProducts,
    getSingleTask, 
    creatingTask, 
    updatingTask, 
    deletingTask, 
    getProductTypeTable,
    getCategoriesTable,
    getUsersTable,
    getProductCard,
    getNewProducts,
    getOneProduct
} = require('../controllers/products.controller');

// We  create a variable that will help us to make the http request using the routes
const router = Router();

// We define the different urls destines for every task to attatch
router.get('/products', getAllTasks); // To get all the registers

router.get('/priceProducts', getProducts);

router.get('/productsList/:id', getSingleTask); // To get a register based on the ID

// To charge comboboxes
router.get('/tipoP', getProductTypeTable);

router.get('/usuarios', getUsersTable);

router.get('/categorias', getCategoriesTable);

router.post('/cproducts', creatingTask); // To create a register

router.put('/productU/:id', updatingTask); // To update a register

router.delete('/productD/:id', deletingTask); // To delete a register

router.get('/productCard', getProductCard); // Para los cards de productos

router.get('/newProduct', getNewProducts);

router.get('/singleProduct/:id', getOneProduct);

// We export our  request variable
module.exports = router;