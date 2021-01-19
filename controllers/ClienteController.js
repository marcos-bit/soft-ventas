const Cliente = require('../models/Cliente');

var controller = {
	registrarCliente: function(req, res){
		let data = req.body;

		var cliente = new Cliente();
		cliente.codigo = data.codigo;
		cliente.razonSocial = data.razonSocial;
		cliente.ruc = data.ruc;
		cliente.digiVeri = data.digiVeri;
		cliente.nombres = data.nombres;
		cliente.apellidos = data.apellidos;
		cliente.ci = data.ci;
		cliente.email = data.email;
		cliente.ciudad = data.ciudad;
		cliente.direccion = data.direccion;
		cliente.telefono = data.telefono;

		cliente.save((err, clienteGuardado) => {
			if(err) return res.status(500).send({
				message: 'Error en el servidor'
			});

			if(!clienteGuardado) return res.status(404).send({
				message: 'No se pudo registrar el cliente'
			});

			return res.status(200).send({
				message: 'Nuevo cliente agregado',
				cliente: clienteGuardado
			});
		});

		/*codigo: {type: Schema.ObjectId, ref: 'codigoCliente'},
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
		createAt: {type: Date, default: Date.now}*/
	},

	obtenerCliente: function(req, res){
		var id = req.params.id;

		Cliente.findOne({_id: id},(err, cliente) => {
			if(err) return res.status(500).send({message: 'Error en el servidor'});
			if(!cliente) return res.status(404).send({message: 'No se encontro el registro'});

			return res.status(200).send({cliente: cliente});
		});
	},

	listarClientes: function(req, res){
		var titulo = req.params.titulo;

		Cliente.find({title: new RegExp(titulo, 'i')}, (err, clientes) => {
			if(err) return res.status(500).send({message: 'Error en el dervidor'});
			if(!clientes) return res.status(403).send({message: 'No existen coincidencias'});

			return res.status(200).send({clientes: clientes});
		});
	},

	editarCliente: function(req, res){
		let id = req.params.id;
		var update = req.body;

		Client.findOneAndUpdate(id, update, {new: true}, (err, clienteActualizado) => {
			if(err) return res.status(500).send({message: 'Error en el servidor'});
			if(!clienteActualizado) return res.status(404).send({message: 'No se pudo actualizar el cliente'});

			return res.status(200).send({
				message: 'Cliente actualizado',
				cliente: clienteActualizado
			});
		});
	},

	eliminarCliente: function(req, res){
		let id = req.params.id;

		Client.findOneAndDelete(id, (err, clienteRemovido) => {
			if(err) return res.status(500).send({message: 'Error en el servidor'});
			if(!clienteRemovido) return res.status(404).send({message: 'No se encontro el cliente'});

			return res.status(200).send({
				message: 'Se elimino el cliente',
				cliente: clienteRemovido
			});
		});
	}
}

module.exports = controller;