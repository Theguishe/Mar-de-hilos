// We import the need extensions and db file
const { Router } = require('express');
const pool = require('../db');

// We import the different functions from clients-controller
const { 
    getAllTasks,
    getSingleTask, 
    creatingTask, 
    updatingTask, 
    deletingTask,
    getClientStatus,
    getCount,
} = require('../controllers/clients.controller');

// We  create a variable that will help us to make the http request using the routes
const router = Router();

// We define the different urls destines for every task to attatch
router.get('/clients', getAllTasks); // To get all the registers

router.get('/countClient', getCount);

router.get('/clientsList/:id', getSingleTask); // To get a register based on the ID

// To charge comboboxes
router.get('/clienteS', getClientStatus);

router.post('/Cclients', creatingTask); // To create a register

router.put('/clientU/:id', updatingTask); // To update a register

router.delete('/clientD/:id', deletingTask); // To delete a register


// We export our  request variable
module.exports = router;