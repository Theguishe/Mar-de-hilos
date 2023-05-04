// We import the need extensions and db file
const { Router } = require('express');
const pool = require('../db');

// We import the different functions from users-controller
const { 
    getAllTasks,
    getSingleTask, 
    creatingTask,
    getUserLevel,
    getUserStatus,
    updatingTask, 
    deletingTask,
} = require('../controllers/users.controller');

// We  create a variable that will help us to make the http request using the routes
const router = Router();

// We define the different urls destines for every task to attatch
router.get('/users', getAllTasks); // To get all the registers

router.get('/usersList/:id', getSingleTask); // To get a register based on the ID

// To charge comboboxes
router.get('/userL', getUserLevel);

router.get('/userStatus', getUserStatus);

router.post('/Cusers', creatingTask); // To create a register

router.put('/userU/:id', updatingTask); // To update a register

router.delete('/userD/:id', deletingTask); // To delete a register

// We export our  request variable
module.exports = router;