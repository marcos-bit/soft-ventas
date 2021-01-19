const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = Schema({
	codigo: {type: Schema.ObjectId, ref: 'codigoCliente'},
	razonSocial: String,
	ruc: Number,
	digiVeri: Number,
	nombres: String,
	apellidos: String,
	ci: String,
	email: String,
	ciudad: String,
	direccion: String,
	telefono: String,
	createAt: {type: Date, default: Date.now}
});

ClienteSchema.pre('save', async function (next) {
	const cantidadClientes = await Cliente.countDocuments();

	this.codigo = cantidadClientes + 1;
	next();
});

module.exports = mongoose.model('Cliente', ClienteSchema);