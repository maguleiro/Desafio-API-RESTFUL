const express = require('express');
const multer = require('multer');
const routeProductos = express.Router();

//Base de datos
const DB_PRODUCTOS = [];

//Midlewares
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/uploads');
    },
    filename:(req, file, cb) => {
        cb(null,`${Date.now()} - ${file.originalname}` )
    }
});

const upload = multer({storage: storage});

routeProductos.get('/', (req, res) =>{
    res.status(200).json(DB_PRODUCTOS);
});

routeProductos.use((req, res, next) =>{
    console.log(`Middleware de Ruta de Productos ${Date.now()}`);
    next();
})

function middlewareGet(req, res, next) {
    console.log(`Middleware de ruta ${req.method} /api/productos${req.url}`);
    next();
}

routeProductos.get('/', middlewareGet,(req,res)=>{
    res.status(200).json(DB_PRODUCTOS);
})

routeProductos.post('/', upload.single('miArchivo'), (req,res) =>{
    console.log(req.body);
    DB_PRODUCTOS.push(req.body);
    res.status(201).json({msg: 'Agregado!', data: req.body});
})

module.exports = routeProductos;
