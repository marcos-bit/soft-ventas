const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DetalleVentaSchema = Schema({
	condicion: String,
	tipoComprobante: String,
	numComprobante: Number,
	idProducto: {type: Schema.ObjectId, ref: 'producto'},
	cantidad: Number,
	idVenta: {type: Schema.ObjectId, ref: 'venta'}
});

module.exports = mongoose.model('DetalleVenta', DetalleVentaSchema);