const { Router } = require('express');
const pool = require('../db');

const { 
    getAllTasks,
    getSingleTask, 
    creatingTask, 
    updatingTask, 
    deletingTask,
    getClientStatus,
} = require('../controllers/clients.controller');

const router = Router();

router.get('/clients', getAllTasks);

router.get('/clientsList/:id', getSingleTask);

router.get('/clienteS', getClientStatus);

router.post('/Cclients', creatingTask);

router.put('/clientU/:id', updatingTask);

router.delete('/clientD/:id', deletingTask);

module.exports = router;