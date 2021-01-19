const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodigoProveedorSchema = Schema({
    codigoProveedor: Number
});

module.exports = mongoose.model('codigoProducto', CodigoProveedorSchema);
