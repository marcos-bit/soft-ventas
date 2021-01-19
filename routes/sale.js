const express = require('express');

const saleController = require('../controllers/SaleController');

const api = express.Router();

api.post('/venta/registrar', saleController.registrar);
api.get('/venta/datos/:id', saleController.datosVenta);

module.exports = api;