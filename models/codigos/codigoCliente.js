const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodigoClienteSchema = Schema({
    codigoCliente: Number
});

module.exports = mongoose.model('codigoProducto', CodigoClienteSchema);
