/*

EJEMPLO

//MODULOS
const express = require('express');
const { Router } = express;

//Instancia de Server
const app = express();

//Segmento 1 de rutas
const router1 = Router();

//RUTAS
app.get('/',(req,res) => {
    res.send('Holaa');
});

router1.get('/',(req,res) => {
    res.send('SEGMENTO 1');
});

app.use('/api/router1', router1);

//SERVIDOR
const PORT = 8081;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error =>{
    console.error(`Error en el servidor ${error}`);
})
*/

//---------------------MODULOS
const express = require('express');
const morgan = require('morgan');

//---------------------Instancia de Server
const app = express();
const routerProductos = require('./routes/productos.router.js');

//---------------------Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'))

app.use((req, res, next)=>{
    console.log(`Middleware de App se ejecuta con todos`)
    next();
});

//---------------------RUTAS
app.use('/api/productos', routerProductos);

//Middlewate de ERROR
app.use((err, req, res, next)=>{
    res.status(err.status || 500).send('Something broke!');
});


//---------------------SERVIDOR
const PORT = 8081;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error =>{
    console.error(`Error en el servidor ${error}`);
})
