const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VentaSchema = Schema({
	idcliente: {type: Schema.ObjectId, ref: 'Cliente'},
	iduser: {type: Schema.ObjectId, ref: 'User'},
	fecha: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Venta', VentaSchema);