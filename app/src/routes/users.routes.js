const { Router } = require('express');
const pool = require('../db');

const { 
    getAllTasks,
    getSingleTask, 
    creatingTask,
    getUserLevel,
    getUserStatus,
    updatingTask, 
    deletingTask,
} = require('../controllers/users.controller');

const router = Router();

router.get('/users', getAllTasks);

router.get('/usersList/:id', getSingleTask);

router.get('/userL', getUserLevel);

router.get('/userStatus', getUserStatus);

router.post('/Cusers', creatingTask);

router.put('/userU/:id', updatingTask);

router.delete('/userD/:id', deletingTask);

module.exports = router;