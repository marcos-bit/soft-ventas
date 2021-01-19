const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodigoProductoSchema = Schema({
    codigoProducto: Number
});

module.exports = mongoose.model('codigoProducto', CodigoProductoSchema);
