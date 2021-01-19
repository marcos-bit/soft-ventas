const express = require('express');

const clientController = require('../controllers/ClientController');

const api = express.Router();

api.post('/cliente/registrar', clientController.registrar);
api.put('/cliente/editar/:id', clientController.editarCliente);
api.delete('/cliente/eliminar/:id', clientController.eliminarCliente);

module.exports = api;