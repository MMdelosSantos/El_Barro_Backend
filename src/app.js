// Importo router y otros
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const ProductsManager = require('./dao/ProductsManager.js');
const CartsManager= require('./dao/CartsManager.js');
// Importando express js

const express = require('express');


const app = express();

//Configurando para que interprete mensajes JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

ProductsManager.path="./src/data/products.json";
CartsManager.path="./src/data/carts.json";
// Creando el servidor 
const PORT=8080

app.get("/", (req, res)=> {
    res.setHeader('Content-Type','text/plain');
    res.status(200).send("Home Page" )
})

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);



app.listen(PORT, () =>  console.log(`Escuchando en puerto ${PORT}`));
