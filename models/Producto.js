const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductoSchema = Schema({
	codigo: Number,
	titulo: String,
	imagen: String,
	proveedor: {type: Schema.ObjectId, ref: 'Proveedor'},
	costo: Number,
	precio_1: Number,
	precio_2: Number,
	precio_3: Number,
	stock: Number,
	vendidos: Number,
	createAt: {type: Date, default: Date.now}
});

ProductoSchema.pre('save', async function (next) {
	const cantidadProductos = await Producto.countDocuments();

	this.codigo = cantidadProductos + 1;
	next();
});

module.exports = mongoose.model('Producto', ProductoSchema);