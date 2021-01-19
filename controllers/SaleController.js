const Sale = require('../models/sale');
const SaleDetail = require('../models/sale_detail');
const Product = require('../models/product');

var controller = {
	registrar: function(req, res){
		let data = req.body;

		var venta = new Sale();
		venta.idcliente = data.idcliente;
		venta.iduser = data.iduser;

		venta.save((err, ventaSaved) => {
			if(ventaSaved){
				let detalles = data.detalles;

				detalles.forEach((element, index) => {
					var detalleVenta = new SaleDetail();

					detalleVenta.idproducto = element.idproducto;
					detalleVenta.cantidad = element.cantidad;
					detalleVenta.idventa = ventaSaved._id;

					detalleVenta.save((err, detalleSaved) => {
						if(detalleSaved){
							Product.findById({_id: element.idproducto}, (err, productoData) => {
								if(productoData){
									Product.findByIdAndUpdate({_id: productoData._id}, {stock: parseInt(productoData.stock) - parseInt(element.cantidad)}, (err, productoEdit) => {
										res.end();
									});

								}else{
									res.send('No se encontro el producto');
								}
							});
						}else{
							res.send('No se pudo registrar los datos');
						}
					});
				});
			}else{
				res.send('No se registro la venta');
			}
		});
	},

	datosVenta: function(req, res){
		var id = req.params.id;

		Sale.findById(id, (err, dataVenta) => {
			if(dataVenta){
				SaleDetail.find({idventa: id}, (err, dataDetalle) => {
					if(dataDetalle){
						res.status(200).send({
							venta: dataVenta,
							detalle: dataDetalle
						});
					}
				});
			}
		});
	}
}

module.exports = controller;