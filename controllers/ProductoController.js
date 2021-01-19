const Producto = require('../models/producto');
var fs = require('fs');

var path = require('path');

var controller = {
	
	registrarProducto: function(req, res){

		var producto = new Producto();
		var data = req.body;

		producto.codigo = data.codigo;
		producto.titulo = data.titulo;
		producto.proveedor = data.proveedor;
		producto.imagen = null;
		producto.costo = data.costo;
		producto.precio_1 = data.precio_1;
		producto.precio_2 = data.precio_2;
		producto.precio_3 = data.precio_3;
		producto.stock = data.stock;
		producto.vendidos = data.vendidos;

		producto.save((err, productoGuardado) => {
			if(err) return res.status(500).send({message: 'Error en el dervidor'});
			if(!productoGuardado) return res.status(404).send({message: 'No se pudo guardar el producto'});

			return res.status(200).send({producto: productoGuardado});
		});
	},

	subirImagen: function(req, res){
		var productoId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.file){
			var filePath = req.file.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[2];
			var extSplit = req.file.originalname.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Producto.findByIdAndUpdate(productoId, {imagen: fileName}, {new: true}, (err, productoActualizado) => {
				
					if(err) return res.status(500).send({message: 'Ocurrio un error al subir el archivo'});

					if(!productoActualizado) return res.status(404).send({message: 'No se encuentra el producto'});

					return res.status(200).send({
						message: 'Se subio una imagen para:',
						producto: productoActualizado
					});
				});

			}else{
				return res.status(200).send({message: 'La extension no es valida'});
			}

		}else{
			return res.status(404).send({message: fileName});
		}

	},

	listarProductos: function(req, res){
		var titulo = req.params.titulo;

		Producto.find({title: new RegExp(titulo, 'i')}, (err, productos) => {
			if(err) return res.status(500).send({message: 'Error en el dervidor'});
			if(!productos) return res.status(403).send({message: 'No existen coincidencias'});

			return res.status(200).send({productos: productos});
		});
	},

	editarProducto: function(req, res){
		var id = req.params.id;
		var update = req.body;

		Producto.findByIdAndUpdate(id, update, {new:true}, (err, productoActualizado) => {

			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!productoActualizado) return res.status(404).send({message: 'No existe el producto'});

			return res.status(200).send({producto: productoActualizado});

		});

	},

	obtenerProducto: function(req, res){
		var id = req.params.id;

		Producto.findOne({_id: id},(err, producto) => {
			if(err) return res.status(500).send({message: 'Error en el servidor'});
			if(!producto) return res.status(404).send({message: 'No se encontro el registro'});

			return res.status(200).send({producto: producto});
		});
	},

	eliminarProducto: function(req, res){
		var id = req.params.id;

		Producto.findByIdAndDelete(id, (err, productoRemovido) => {

			if(err) return res.status(500).send({message: 'Error al eliminar'});

			if(!productoRemovido){
				res.status(404).send({message: 'No existe el producto'});
			}else{
				fs.unlink('./uploads/'+productoRemovido.imagen, (err) => {
					if(err) throw err;
				});
				res.status(200).send({message: 'Se elimino el siguiente registro', producto: productoRemovido});
			}
		
		});
	},

	actualizarStock: function(req, res){
		var id = req.params.id;

		var data = req.body;

		Producto.findById(id, (err, productoData) => {
			if(productoData){
				Product.findByIdAndUpdate(id, {stock: parseInt(productoData.stock) + parseInt(data.stock)}, {new: true}, (err, productoActualizado) => {
					if(productoActualizado){
						res.status(200).send({message: 'Stock actualizado', producto: productoActualizado});
					}else{
						res.status(500).send(err);
					}
				});
			}
		});
	},

	getImageFile(req, res){
		var file = req.params.image;
		var path_file= './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({message: 'No existe la imagen!'});
			}
		});
	}
}

module.exports = controller;