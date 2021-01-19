const express = require('express');
const productController = require('../controllers/ProductController');
const crypto = require('crypto');
const multer = require('multer');
const storage = multer.diskStorage({
	destination(req,file,cb){
		cb(null,'./uploads');
	},

	filename(req, file = {}, cb){
		const { originalname } = file;

		const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];

	    // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);

	    crypto.pseudoRandomBytes(16, function (err, raw) {

	      cb(null, raw.toString('hex') + Date.now() + fileExtension);

	    });
	}
});

var mul_upload = multer({dest: './uploads',storage});



const api = express.Router();

api.post('/producto/registrar', productController.registrar);
api.post('/producto/upload-image/:id', mul_upload.single('image'), productController.uploadImage);
api.get('/productos/:titulo?', productController.listarProductos);
api.put('/producto/editar/:id', productController.editarProducto);
api.get('/producto/:id', productController.obtenerProducto);
api.delete('/producto/eliminar/:id', productController.eliminarProducto);
api.put('/producto/stock/:id', productController.updateStock);
api.get('/producto/image/:image', productController.getImageFile);

module.exports = api;