const express = require('express');
const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const port = process.env.PORT || 4201;

// Routes
var user_routes = require('./routes/user');
var category_routes = require('./routes/category');
var product_routes = require('./routes/product');
var client_routes = require('./routes/client');
var sale_routes = require('./routes/sale');

const app = express();

mongoose.connect('mongodb://localhost:27017/softventas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
	if(err){
		throw err;
	}else{
		app.listen(port);
		console.log("Conectado a la base de datos");
		console.log("Servidor corriendo en el puerto", port);
	}
});

app.use(bodyparser.urlencoded({extended: true}));

app.use(bodyparser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', product_routes);
app.use('/api', client_routes);
app.use('/api', sale_routes);

module.exports = app;