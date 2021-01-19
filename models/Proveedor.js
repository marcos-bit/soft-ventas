const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedorSchema = Schema({
    codigo: Number,
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

ProveedorSchema.pre('save', async function (next) {
	const cantidadProveedores = await Proveedor.countDocuments();

	this.codigo = cantidadProveedores + 1;
	next();
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);